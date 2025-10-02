import { auth, firebaseConfig } from '@/configs/firebase'
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

const actionCode: ActionCodeSettings = {
  url: `${firebaseConfig.appOrigin}/callback`,
  handleCodeInApp: true,
}

const provider = new GoogleAuthProvider()

export const ServiceAuth = {
  // Sign in
  signInWithGoogle: async (): Promise<User> => {
    const { user } = await signInWithPopup(auth, provider)
    return user
  },

  signInWithEmail: async (email: string, password: string): Promise<User> =>
    (await signInWithEmailAndPassword(auth, email, password)).user,

  // Sign up
  createUserWithEmail: async (email: string, password: string, displayName?: string): Promise<User> => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) await updateProfile(user, { displayName })
    await sendEmailVerification(user, actionCode)
    return user
  },

  // Password reset & email verification
  sendPasswordReset: async (email: string) =>
    sendPasswordResetEmail(auth, email, actionCode),

  sendEmailVerificationToCurrentUser: async (): Promise<void> => {
    const user = auth.currentUser
    if (!user) throw new Error('User not authenticated')
    await sendEmailVerification(user, actionCode)
  },

  confirmUserPasswordReset: async (oobCode: string, newPassword: string): Promise<void> =>
    confirmPasswordReset(auth, oobCode, newPassword),

  applyUserActionCode: async (oobCode: string) =>
    applyActionCode(auth, oobCode),

  // Sign out
  signOut: async (): Promise<void> => signOut(auth),

  // Re-authentication for sensitive actions
  reauthenticateWithPassword: async (password: string): Promise<void> => {
    const user = auth.currentUser
    if (!user?.email) throw new Error('User not authenticated')
    const credential = EmailAuthProvider.credential(user.email, password)
    await reauthenticateWithCredential(user, credential)
  },

  // User status
  getCurrentUser: (): User | null => auth.currentUser,
  isAuthenticated: (): boolean => !!auth.currentUser,
  isEmailVerified: (): boolean => auth.currentUser?.emailVerified ?? false,

  // Auth state listener
  onAuthStateChanged: auth.onAuthStateChanged.bind(auth),
}
