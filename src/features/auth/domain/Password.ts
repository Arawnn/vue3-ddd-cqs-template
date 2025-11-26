import { ValueObject } from '@/core/domain/ValueObject'

export interface PasswordPolicy {
  minLength: number
  requireUppercase: boolean
  requireLowercase: boolean
  requireNumber: boolean
  requireSpecial: boolean
}

export class InvalidPasswordError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidPasswordError'
  }
}

export class Password extends ValueObject<string> {
  private static readonly DEFAULT_POLICY: PasswordPolicy = {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: false,
  }

  constructor(value: string, policy: PasswordPolicy = Password.DEFAULT_POLICY) {
    super(value)
    this.validate(value, policy)
  }

  private validate(password: string, policy: PasswordPolicy): void {
    const errors: string[] = []

    if (password.length < policy.minLength) {
      errors.push(`at least ${policy.minLength} characters`)
    }
    if (policy.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('one uppercase letter')
    }
    if (policy.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('one lowercase letter')
    }
    if (policy.requireNumber && !/[0-9]/.test(password)) {
      errors.push('one number')
    }
    if (policy.requireSpecial && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('one special character')
    }

    if (errors.length > 0) {
      throw new InvalidPasswordError(`Password must contain: ${errors.join(', ')}`)
    }
  }

  static isValid(value: string, policy?: PasswordPolicy): { valid: boolean; error?: string } {
    try {
      new Password(value, policy)
      return { valid: true }
    } catch (error) {
      return { valid: false, error: error instanceof Error ? error.message : 'Invalid password' }
    }
  }
}
