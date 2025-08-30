interface Messages {
  title: string
  description?: string
}

export const errorCode = {
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
    title: 'Popup Request Failed',
    description: 'Another popup interrupted the login process. Please try again.',
  },
  'task/task-add-error': {
    title: 'Failed to Add Task',
    description: 'An error occurred while creating the task. Please try again.',
  },
  'task/task-update-error': {
    title: 'Failed to Update Task',
    description: 'An error occurred while updating the task. Please try again.',
  },
  'task/task-delete-error': {
    title: 'Failed to Delete Task',
    description: 'An error occurred while deleting the task. Please try again.',
  },
  default: {
    title: 'Something Went Wrong',
    description: 'An error occurred while processing your request. Contact support if the problem persists.',
  },
} satisfies Record<string, Messages>

export type ErrorKey = keyof typeof errorCode

export const successCode = {
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
  'task/task-add-success': {
    title: 'Task Added',
    description: 'The new task was successfully created.',
  },
  'task/task-update-success': {
    title: 'Task Updated',
    description: 'The task was successfully updated.',
  },
  'task/task-delete-success': {
    title: 'Task deleted',
    description: 'The task was removed from the table.',
  },
  default: {
    title: 'Successfully',
    description: 'The action was completed successfully.',
  },
} satisfies Record<string, Messages>

export type SuccessKey = keyof typeof successCode
