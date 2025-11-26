import { ValueObject } from '@core/domain/ValueObject'

export class InvalidEmailError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidEmailError'
  }
}

export class Email extends ValueObject<string> {
  // RFC 5322 simplified regex
  private static readonly EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  private static readonly MAX_LENGTH = 254

  constructor(value: string) {
    const normalized = value.toLowerCase().trim()
    super(normalized)
    this.validate(normalized)
  }

  private validate(email: string): void {
    if (!email) {
      throw new InvalidEmailError('Email is required')
    }
    if (email.length > Email.MAX_LENGTH) {
      throw new InvalidEmailError(`Email must be at most ${Email.MAX_LENGTH} characters`)
    }
    if (!Email.EMAIL_REGEX.test(email)) {
      throw new InvalidEmailError('Invalid email format')
    }
  }

  static isValid(value: string): { valid: boolean; error?: string } {
    try {
      new Email(value)
      return { valid: true }
    } catch (error) {
      return { valid: false, error: error instanceof Error ? error.message : 'Invalid email' }
    }
  }
}
