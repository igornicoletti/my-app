interface Message {
  title: string
  description?: string
}

const createEntityMessages = (entity: string, plural?: string) => {
  const singular = entity.charAt(0).toUpperCase() + entity.slice(1)
  const pluralized = plural ?? `${singular}s`

  return {
    // Errors
    [`${entity}/${entity}-add-error`]: {
      title: `Failed to Add ${singular}`,
      description: `An error occurred while creating the ${entity}.`,
    },
    [`${entity}/${entity}-update-error`]: {
      title: `Failed to Update ${singular}`,
      description: `An error occurred while updating the ${entity}.`,
    },
    [`${entity}/${entity}-delete-error`]: {
      title: `Failed to Delete ${singular}`,
      description: `An error occurred while deleting the ${entity}.`,
    },
    [`${entity}/fetch-error`]: {
      title: `Failed to Fetch ${pluralized}`,
      description: `We could not load the ${pluralized.toLowerCase()}.`,
    },

    // Success
    [`${entity}/${entity}-add-success`]: {
      title: `${singular} Added`,
      description: `The new ${entity} was successfully created.`,
    },
    [`${entity}/${entity}-update-success`]: {
      title: `${singular} Updated`,
      description: `The ${entity} was successfully updated.`,
    },
    [`${entity}/${entity}-delete-success`]: {
      title: `${singular} Deleted`,
      description: `The ${entity} was successfully deleted.`,
    },
  }
}

const authMessages: Record<string, Message> = {
  // Errors
  'auth/invalid-credential': {
    title: 'Invalid Credentials',
    description: 'The credentials you entered are incorrect.',
  },
  'auth/invalid-login-credentials': {
    title: 'Invalid Login Credentials',
    description: 'Your email or password is incorrect.',
  },
  'auth/email-already-in-use': {
    title: 'Email Already in Use',
    description: 'This email is already linked to another account.',
  },
  'auth/unverified-email': {
    title: 'Email Not Verified',
    description: 'Verify your email address before logging in.',
  },
  'auth/too-many-requests': {
    title: 'Too Many Attempts',
    description: 'You’ve attempted to log in too many times.',
  },
  'auth/popup-blocked': {
    title: 'Popup Blocked',
    description: 'Your browser blocked the login popup.',
  },
  'auth/popup-closed-by-user': {
    title: 'Popup Closed',
    description: 'The popup was closed before completing login.',
  },
  'auth/expired-action-code': {
    title: 'Link Expired',
    description: 'The link you used has expired.',
  },
  'auth/invalid-action-code': {
    title: 'Invalid Link',
    description: 'The link is invalid or corrupted.',
  },
  'auth/requires-recent-login': {
    title: 'Re-authentication Required',
    description: 'For security reasons, log in again to complete this action.',
  },
  'auth/cancelled-popup-request': {
    title: 'Popup Request Failed',
    description: 'Another popup interrupted the login process.',
  },

  // Success
  'auth/account-created': {
    title: 'Account Created',
    description: 'Your account was created successfully. Please verify your email before logging in.',
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
}

const defaultMessages: Record<string, Message> = {
  defaultError: {
    title: 'Error',
    description: 'An error occurred while processing your request. Contact support if the problem persists.',
  },
  defaultSuccess: {
    title: 'Success',
    description: 'The action was completed successfully.',
  },
}

export const messages = {
  ...authMessages,
  ...createEntityMessages('task', 'Tasks'),
  ...createEntityMessages('user', 'Users'),
  ...defaultMessages,
} satisfies Record<string, Message>

export type MessageKey = keyof typeof messages
