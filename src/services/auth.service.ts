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
  updateProfile,
  type ActionCodeSettings,
  type User
} from 'firebase/auth'

import { AUTH } from '@/configs'

const APP_ORIGIN = import.meta.env.VITE_APP_ORIGIN
const ACTION_CODE_SETTINGS: ActionCodeSettings = {
  url: `${APP_ORIGIN}/callback`,
  handleCodeInApp: true
}

export const authService = {
  signInWithGoogle: async (): Promise<User> => {
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(AUTH, provider)
    return user
  },

  signInWithEmail: async (email: string, password: string): Promise<User> => {
    const { user } = await signInWithEmailAndPassword(AUTH, email, password)
    return user
  },

  createUserWithEmail: async (email: string, password: string, displayName?: string): Promise<User> => {
    const { user } = await createUserWithEmailAndPassword(AUTH, email, password)
    if (displayName) {
      await updateProfile(user, { displayName })
    }
    await sendEmailVerification(user, ACTION_CODE_SETTINGS)
    return user
  },

  sendPasswordReset: async (email: string): Promise<void> => {
    await sendPasswordResetEmail(AUTH, email, ACTION_CODE_SETTINGS)
  },

  sendEmailVerificationToCurrentUser: async (): Promise<void> => {
    const user = AUTH.currentUser
    if (!user) throw new Error('User not authenticated')
    await sendEmailVerification(user, ACTION_CODE_SETTINGS)
  },

  confirmUserPasswordReset: async (oobCode: string, newPassword: string): Promise<void> => {
    await confirmPasswordReset(AUTH, oobCode, newPassword)
  },

  applyUserActionCode: async (oobCode: string): Promise<void> => {
    await applyActionCode(AUTH, oobCode)
  },

  signOut: async (): Promise<void> => {
    await signOut(AUTH)
  },

  reauthenticateWithPassword: async (password: string): Promise<void> => {
    const user = AUTH.currentUser
    if (!user?.email) throw new Error('User not authenticated')
    const credential = EmailAuthProvider.credential(user.email, password)
    await reauthenticateWithCredential(user, credential)
  },

  getCurrentUser: (): User | null => AUTH.currentUser,

  isAuthenticated: (): boolean => !!AUTH.currentUser,

  isEmailVerified: (): boolean => AUTH.currentUser?.emailVerified ?? false,

  onAuthStateChanged: AUTH.onAuthStateChanged.bind(AUTH)
}
