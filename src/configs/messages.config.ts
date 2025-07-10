export type MessageContent = {
  title: string
  description: string
}

export const ERROR = {
  'auth/invalid-credential': {
    title: 'Invalid Credentials',
    description: 'The credentials you entered are incorrect. Please try again.',
  },
  'auth/invalid-login-credentials': {
    title: 'Invalid Login Credentials',
    description: 'Your email or password is incorrect. Please verify and try again.',
  },
  'auth/email-already-in-use': {
    title: 'Email Already in Use',
    description: 'This email is already linked to another account. Try logging in or use a different email.',
  },
  'auth/missing-password': {
    title: 'Password Required',
    description: 'Password is required to continue. Please enter your password.',
  },
  'auth/unverified-email': {
    title: 'Email Not Verified',
    description: 'Please verify your email address before logging in. Check your inbox for the verification email.',
  },
  'auth/too-many-requests': {
    title: 'Too Many Attempts',
    description: 'You’ve attempted to log in too many times. Please wait and try again later.',
  },
  'auth/popup-blocked': {
    title: 'Popup Blocked',
    description: 'Your browser blocked the login popup. Enable popups for this site and try again.',
  },
  'auth/popup-closed-by-user': {
    title: 'Popup Closed',
    description: 'The popup was closed before completing login. Please try again.',
  },
  'auth/expired-action-code': {
    title: 'Link Expired',
    description: 'The link you used has expired. Please request a new one.',
  },
  'auth/invalid-action-code': {
    title: 'Invalid Link',
    description: 'The link is invalid or corrupted. Please try again with a valid one.',
  },
  'auth/requires-recent-login': {
    title: 'Re-authentication Required',
    description: 'For security reasons, please log in again to complete this action.',
  },
  'auth/cancelled-popup-request': {
    title: 'Popup Request Canceled',
    description: 'Another popup interrupted the login process. Please try again.',
  },
  default: {
    title: 'Authentication Error',
    description: 'An unexpected error occurred. Please try again or contact support if the problem persists.',
  },
} as const

export type ErrorMessageKey = keyof typeof ERROR

export const SUCCESS = {
  'auth/account-created': {
    title: 'Account Created',
    description: 'Your account was created successfully. Please check your email to verify before logging in.',
  },
  'auth/email-verification-sent': {
    title: 'Verification Email Sent',
    description: 'We sent you a verification email. Please check your inbox to activate your account.',
  },
  'auth/email-verified': {
    title: 'Email Verified',
    description: 'Your email has been verified. You can now sign in.',
  },
  'auth/login-success': {
    title: 'Login Successful',
    description: 'You’ve signed in successfully. Welcome!',
  },
  'auth/logout-success': {
    title: 'Signed Out',
    description: 'You’ve been signed out successfully. See you next time!',
  },
  'auth/password-reset-email-sent': {
    title: 'Password Reset Email Sent',
    description: 'We sent you a link to reset your password. Please check your inbox.',
  },
  'auth/password-reset-success': {
    title: 'Password Updated',
    description: 'Your password has been updated. You can now sign in with the new one.',
  },
  default: {
    title: 'Authentication Success',
    description: 'The action was completed successfully.',
  },
} as const

export type SuccessMessageKey = keyof typeof SUCCESS
