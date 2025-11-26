import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidCredentialsError extends DomainError {
  constructor(messageOrCause?: string | Error, cause?: Error) {
    if (typeof messageOrCause === 'string') {
      super(messageOrCause, 'AUTH_INVALID_CREDENTIALS', cause)
    } else if (messageOrCause instanceof Error) {
      const message = messageOrCause.message || 'Invalid email or password'
      super(message, 'AUTH_INVALID_CREDENTIALS', messageOrCause)
    } else {
      super('Invalid email or password', 'AUTH_INVALID_CREDENTIALS', cause)
    }
  }
}

export class EmailAlreadyExistsError extends DomainError {
  constructor(email: string, cause?: Error) {
    super(`Email ${email} is already registered`, 'AUTH_EMAIL_EXISTS', cause)
  }
}

export class UserNotFoundError extends DomainError {
  constructor(cause?: Error) {
    super('User not found', 'AUTH_USER_NOT_FOUND', cause)
  }
}

export class AuthenticationRequiredError extends DomainError {
  constructor(cause?: Error) {
    super('Authentication required', 'AUTH_REQUIRED', cause)
  }
}

export class WeakPasswordError extends DomainError {
  constructor(message: string, cause?: Error) {
    super(message, 'AUTH_WEAK_PASSWORD', cause)
  }
}

export class EmailNotConfirmedError extends DomainError {
  constructor(message?: string, cause?: Error) {
    super(
      message ||
        'Please confirm your email address before signing in. Check your inbox for the confirmation link.',
      'AUTH_EMAIL_NOT_CONFIRMED',
      cause,
    )
  }
}
