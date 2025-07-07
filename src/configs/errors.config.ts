type Error = {
  title: string
  description: string
}

export const ERROR: Record<string, Error> = {
  'auth/user-disabled': {
    title: 'User disabled',
    description: 'This user has been disabled. Please contact support.',
  },
  'auth/user-not-found': {
    title: 'User not found',
    description: 'There is no account registered with this email address.',
  },
  'auth/wrong-password': {
    title: 'Incorrect password',
    description: 'The password you entered is incorrect or not set.',
  },
  'auth/email-already-in-use': {
    title: 'Email already in use',
    description: 'This email is already associated with another account.',
  },
  'auth/credential-already-in-use': {
    title: 'Credential already in use',
    description: 'This credential is already linked to another account.',
  },
  'auth/account-exists-with-different-credential': {
    title: 'Account exists with different login',
    description: 'This email is already linked to another login method. Please sign in using the original method.',
  },
  'auth/invalid-credential': {
    title: 'Invalid credentials',
    description: 'The credentials provided are invalid. Please try again.',
  },
  'auth/invalid-login-credentials': {
    title: 'Invalid login',
    description: 'Incorrect email or password. Please check and try again.',
  },
  'auth/missing-password': {
    title: 'Missing password',
    description: 'Please enter your password to continue.',
  },
  'auth/unverified-email': {
    title: 'Email not verified',
    description: 'Please verify your email address before logging in. Check your inbox for a verification link.',
  },
  'auth/operation-not-allowed': {
    title: 'Operation not allowed',
    description: 'This operation is currently not allowed. Please contact support.',
  },
  'auth/network-request-failed': {
    title: 'Network error',
    description: 'Please check your internet connection and try again.',
  },
  'auth/too-many-requests': {
    title: 'Too many attempts',
    description: 'Too many failed login attempts. Please wait a few minutes and try again.',
  },
  'auth/popup-blocked': {
    title: 'Popup blocked',
    description: 'The login popup was blocked by your browser. Please allow popups for this site.',
  },
  'auth/popup-closed-by-user': {
    title: 'Popup closed',
    description: 'The login popup was closed before it completed. Please try again.',
  },
  'auth/expired-action-code': {
    title: 'Link expired',
    description: 'The password reset link has expired. Please request a new one.',
  },
  'auth/invalid-action-code': {
    title: 'Invalid link',
    description: 'The action link is invalid or malformed.',
  },
  'auth/requires-recent-login': {
    title: 'Re-authentication required',
    description: 'Please sign in again to complete this action for security reasons.',
  },
  'auth/unauthorized-domain': {
    title: 'Unauthorized domain',
    description: 'This domain is not allowed for sign-in. Check Firebase OAuth settings.',
  },
  'auth/cancelled-popup-request': {
    title: 'Popup request cancelled',
    description: 'Another popup was opened and cancelled this one.',
  },
  default: {
    title: 'Authentication error',
    description: 'An unexpected error occurred. Please try again later.',
  }
}
