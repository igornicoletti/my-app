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
  type User
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import { AUTH, CODE, DB } from '@/configs'

export const authService = {
  // Sign in
  signInWithGoogle: async (): Promise<User> => {
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(AUTH, provider)
    return user
  },

  signInWithEmail: async (email: string, password: string): Promise<User> =>
    (await signInWithEmailAndPassword(AUTH, email, password)).user,

  // Sign up
  createUserWithEmail: async (email: string, password: string, displayName?: string): Promise<User> => {
    const { user } = await createUserWithEmailAndPassword(AUTH, email, password)
    if (displayName) await updateProfile(user, { displayName })
    const userRef = doc(DB, 'user', user.uid)
    await setDoc(userRef, {
      uid: user.uid,
      name: displayName,
      email: user.email,
      role: 'viewer',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    await sendEmailVerification(user, CODE)
    return user
  },

  // Password reset & email verification
  sendPasswordReset: async (email: string): Promise<void> =>
    sendPasswordResetEmail(AUTH, email, CODE),

  sendEmailVerificationToCurrentUser: async (): Promise<void> => {
    const user = AUTH.currentUser
    if (!user) throw new Error('User not authenticated')
    await sendEmailVerification(user, CODE)
  },

  confirmUserPasswordReset: async (oobCode: string, newPassword: string): Promise<void> =>
    confirmPasswordReset(AUTH, oobCode, newPassword),

  applyUserActionCode: async (oobCode: string): Promise<void> =>
    applyActionCode(AUTH, oobCode),

  // Sign out
  signOut: async (): Promise<void> => signOut(AUTH),

  // Re-authentication for sensitive actions
  reauthenticateWithPassword: async (password: string): Promise<void> => {
    const user = AUTH.currentUser
    if (!user?.email) throw new Error('User not authenticated')
    const credential = EmailAuthProvider.credential(user.email, password)
    await reauthenticateWithCredential(user, credential)
  },

  // User status
  getCurrentUser: (): User | null => AUTH.currentUser,
  isAuthenticated: (): boolean => !!AUTH.currentUser,
  isEmailVerified: (): boolean => AUTH.currentUser?.emailVerified ?? false,

  // Auth state listener
  onAuthStateChanged: AUTH.onAuthStateChanged.bind(AUTH),
}
