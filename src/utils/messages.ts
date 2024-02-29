export const messages = {
  form: {
    email: 'please provide a valid email address',
    emailReq: 'email is required',
    passwordRules: {
      min: 'password must be at least 8 characters',
      digit: 'password must contain at least one digit [0-9]',
      uppercase: 'password must contain at least one uppercase letter [A-Z]',
    },
    passwordMismatch: `password doesn't match, try again`,
    passwordReq: 'password is required',
    dream: {
      title: 'title is required',
      content: 'content is required',
      contentDescription: 'what happened in the dream?',
      category: 'category is required',
      nightmare: 'was it a nightmare?',
    },
  },
  errors: {
    incorrectCredentials: 'incorrect credentials, try again!',
    accountAlreadyExists:
      'there already exists an account connected to this email',
    unknown: 'something went wrong, try again',
  },
  dashboard: {},
};
