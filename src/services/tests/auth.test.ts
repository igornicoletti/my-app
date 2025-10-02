import { auth } from '@/configs/firebase'
import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ServiceAuth } from '../auth'

// Mock Firebase Auth
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn(),
  sendEmailVerification: vi.fn(),
  confirmPasswordReset: vi.fn(),
  applyActionCode: vi.fn(),
  reauthenticateWithCredential: vi.fn(),
  EmailAuthProvider: {
    credential: vi.fn()
  },
  GoogleAuthProvider: vi.fn()
}))

// Mock Firebase config
vi.mock('@/configs/firebase', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn()
  },
  firebaseConfig: {
    appOrigin: 'http://localhost:3000'
  }
}))

describe('ServiceAuth', () => {
  const mockUser = {
    uid: 'test-uid',
    email: 'test@example.com',
    displayName: 'Test User',
    emailVerified: true
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('signInWithEmail (login function)', () => {
    it('should call signInWithEmailAndPassword with correct parameters', async () => {
      const email = 'test@example.com'
      const password = 'password123'

      // Mock the Firebase response
      const mockAuthResult = { user: mockUser }
      vi.mocked(signInWithEmailAndPassword).mockResolvedValue(mockAuthResult as any)

      const result = await ServiceAuth.signInWithEmail(email, password)

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password)
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1)
      expect(result).toBe(mockUser)
    })

    it('should throw error when Firebase authentication fails', async () => {
      const email = 'invalid@example.com'
      const password = 'wrongpassword'
      const mockError = new Error('Invalid credentials')

      vi.mocked(signInWithEmailAndPassword).mockRejectedValue(mockError)

      await expect(ServiceAuth.signInWithEmail(email, password)).rejects.toThrow('Invalid credentials')
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password)
    })
  })

  describe('signInWithGoogle (Google login)', () => {
    it('should call signInWithPopup with GoogleAuthProvider and correct parameters', async () => {
      const mockProvider = new GoogleAuthProvider()
      const mockAuthResult = { user: mockUser }

      vi.mocked(GoogleAuthProvider).mockImplementation(() => mockProvider as any)
      vi.mocked(signInWithPopup).mockResolvedValue(mockAuthResult as any)

      const result = await ServiceAuth.signInWithGoogle()

      expect(GoogleAuthProvider).toHaveBeenCalledTimes(1)
      expect(signInWithPopup).toHaveBeenCalledWith(auth, mockProvider)
      expect(signInWithPopup).toHaveBeenCalledTimes(1)
      expect(result).toBe(mockUser)
    })

    it('should throw error when Google authentication fails', async () => {
      const mockProvider = new GoogleAuthProvider()
      const mockError = new Error('Google sign-in failed')

      vi.mocked(GoogleAuthProvider).mockImplementation(() => mockProvider as any)
      vi.mocked(signInWithPopup).mockRejectedValue(mockError)

      await expect(ServiceAuth.signInWithGoogle()).rejects.toThrow('Google sign-in failed')
      expect(signInWithPopup).toHaveBeenCalledWith(auth, mockProvider)
    })
  })

  describe('createUserWithEmail', () => {
    it('should call createUserWithEmailAndPassword with correct parameters', async () => {
      const email = 'newuser@example.com'
      const password = 'password123'
      const displayName = 'New User'

      const mockAuthResult = { user: mockUser }
      vi.mocked(createUserWithEmailAndPassword).mockResolvedValue(mockAuthResult as any)
      vi.mocked(updateProfile).mockResolvedValue(undefined)
      vi.mocked(sendEmailVerification).mockResolvedValue(undefined)

      const result = await ServiceAuth.createUserWithEmail(email, password, displayName)

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password)
      expect(updateProfile).toHaveBeenCalledWith(mockUser, { displayName })
      expect(sendEmailVerification).toHaveBeenCalledWith(mockUser, {
        url: 'http://localhost:3000/callback',
        handleCodeInApp: true
      })
      expect(result).toBe(mockUser)
    })

    it('should work without displayName parameter', async () => {
      const email = 'newuser@example.com'
      const password = 'password123'

      const mockAuthResult = { user: mockUser }
      vi.mocked(createUserWithEmailAndPassword).mockResolvedValue(mockAuthResult as any)
      vi.mocked(sendEmailVerification).mockResolvedValue(undefined)

      const result = await ServiceAuth.createUserWithEmail(email, password)

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password)
      expect(updateProfile).not.toHaveBeenCalled()
      expect(sendEmailVerification).toHaveBeenCalledWith(mockUser, {
        url: 'http://localhost:3000/callback',
        handleCodeInApp: true
      })
      expect(result).toBe(mockUser)
    })
  })

  describe('sendPasswordReset', () => {
    it('should call sendPasswordResetEmail with correct parameters', async () => {
      const email = 'test@example.com'

      vi.mocked(sendPasswordResetEmail).mockResolvedValue(undefined)

      await ServiceAuth.sendPasswordReset(email)

      expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, email, {
        url: 'http://localhost:3000/callback',
        handleCodeInApp: true
      })
      expect(sendPasswordResetEmail).toHaveBeenCalledTimes(1)
    })
  })

  describe('signOut', () => {
    it('should call Firebase signOut with auth instance', async () => {
      vi.mocked(signOut).mockResolvedValue(undefined)

      await ServiceAuth.signOut()

      expect(signOut).toHaveBeenCalledWith(auth)
      expect(signOut).toHaveBeenCalledTimes(1)
    })
  })

  describe('reauthenticateWithPassword', () => {
    it('should call reauthenticateWithCredential with correct parameters', async () => {
      const password = 'currentpassword'
      const mockCredential = 'mock-credential'
      const mockCurrentUser = { ...mockUser, email: 'test@example.com' }

      vi.spyOn(auth, 'currentUser', 'get').mockReturnValue(mockCurrentUser as any)

      vi.mocked(EmailAuthProvider.credential).mockReturnValue(mockCredential as any)
      vi.mocked(reauthenticateWithCredential).mockResolvedValue({ user: mockUser } as any)

      await ServiceAuth.reauthenticateWithPassword(password)

      expect(EmailAuthProvider.credential).toHaveBeenCalledWith(mockCurrentUser.email, password)
      expect(reauthenticateWithCredential).toHaveBeenCalledWith(mockCurrentUser, mockCredential)
    })

    it('should throw error when user is not authenticated', async () => {
      vi.spyOn(auth, 'currentUser', 'get').mockReturnValue(null)

      await expect(ServiceAuth.reauthenticateWithPassword('password')).rejects.toThrow('User not authenticated')
      expect(EmailAuthProvider.credential).not.toHaveBeenCalled()
      expect(reauthenticateWithCredential).not.toHaveBeenCalled()
    })

    it('should throw error when user email is not available', async () => {
      const mockCurrentUser = { ...mockUser, email: null }
      vi.spyOn(auth, 'currentUser', 'get').mockReturnValue(mockCurrentUser as any)

      await expect(ServiceAuth.reauthenticateWithPassword('password')).rejects.toThrow('User not authenticated')
      expect(EmailAuthProvider.credential).not.toHaveBeenCalled()
      expect(reauthenticateWithCredential).not.toHaveBeenCalled()
    })
  })

  describe('utility methods', () => {
    it('should return current user from auth instance', () => {
      vi.spyOn(auth, 'currentUser', 'get').mockReturnValue(mockUser as any)

      const result = ServiceAuth.getCurrentUser()

      expect(result).toBe(mockUser)
    })

    it('should return null when no current user', () => {
      vi.spyOn(auth, 'currentUser', 'get').mockReturnValue(null)

      const result = ServiceAuth.getCurrentUser()

      expect(result).toBeNull()
    })

    it('should return true when user is authenticated', () => {
      vi.spyOn(auth, 'currentUser', 'get').mockReturnValue(mockUser as any)

      const result = ServiceAuth.isAuthenticated()

      expect(result).toBe(true)
    })

    it('should return false when user is not authenticated', () => {
      vi.spyOn(auth, 'currentUser', 'get').mockReturnValue(null)

      const result = ServiceAuth.isAuthenticated()

      expect(result).toBe(false)
    })

    it('should return email verification status', () => {
      const verifiedUser = { ...mockUser, emailVerified: true }
      vi.spyOn(auth, 'currentUser', 'get').mockReturnValue(verifiedUser as any)

      const result = ServiceAuth.isEmailVerified()

      expect(result).toBe(true)
    })

    it('should return false when no current user for email verification', () => {
      vi.spyOn(auth, 'currentUser', 'get').mockReturnValue(null)

      const result = ServiceAuth.isEmailVerified()

      expect(result).toBe(false)
    })
  })

  describe('password reset and email verification', () => {
    it('should send email verification to current user', async () => {
      vi.spyOn(auth, 'currentUser', 'get').mockReturnValue(mockUser as any)
      vi.mocked(sendEmailVerification).mockResolvedValue(undefined)

      await ServiceAuth.sendEmailVerificationToCurrentUser()

      expect(sendEmailVerification).toHaveBeenCalledWith(mockUser, {
        url: 'http://localhost:3000/callback',
        handleCodeInApp: true
      })
    })

    it('should throw error when no current user for email verification', async () => {
      vi.spyOn(auth, 'currentUser', 'get').mockReturnValue(null)

      await expect(ServiceAuth.sendEmailVerificationToCurrentUser()).rejects.toThrow('User not authenticated')
      expect(sendEmailVerification).not.toHaveBeenCalled()
    })

    it('should confirm password reset with correct parameters', async () => {
      const oobCode = 'test-code'
      const newPassword = 'newpassword123'

      vi.mocked(confirmPasswordReset).mockResolvedValue(undefined)

      await ServiceAuth.confirmUserPasswordReset(oobCode, newPassword)

      expect(confirmPasswordReset).toHaveBeenCalledWith(auth, oobCode, newPassword)
    })

    it('should apply action code with correct parameters', async () => {
      const oobCode = 'test-action-code'

      vi.mocked(applyActionCode).mockResolvedValue(undefined)

      await ServiceAuth.applyUserActionCode(oobCode)

      expect(applyActionCode).toHaveBeenCalledWith(auth, oobCode)
    })
  })
})
