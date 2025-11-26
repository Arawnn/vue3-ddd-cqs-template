// src/features/auth/domain/__tests__/Email.spec.ts
import { describe, it, expect } from 'vitest'
import { Email, InvalidEmailError } from '../Email'

describe('Email Value Object', () => {
  it('should create valid email', () => {
    const email = new Email('test@example.com')
    expect(email.value).toBe('test@example.com')
  })

  it('should normalize email to lowercase', () => {
    const email = new Email('TEST@EXAMPLE.COM')
    expect(email.value).toBe('test@example.com')
  })

  it('should trim whitespace', () => {
    const email = new Email('  test@example.com  ')
    expect(email.value).toBe('test@example.com')
  })

  it('should throw for invalid email format', () => {
    expect(() => new Email('invalid')).toThrow(InvalidEmailError)
    expect(() => new Email('invalid@')).toThrow(InvalidEmailError)
    expect(() => new Email('@example.com')).toThrow(InvalidEmailError)
  })

  it('should throw for empty email', () => {
    expect(() => new Email('')).toThrow(InvalidEmailError)
    expect(() => new Email('   ')).toThrow(InvalidEmailError)
  })

  it('should throw for email too long', () => {
    const longEmail = 'a'.repeat(250) + '@example.com'
    expect(() => new Email(longEmail)).toThrow(InvalidEmailError)
  })

  it('should validate email format correctly', () => {
    expect(Email.isValid('test@example.com')).toEqual({ valid: true })
    expect(Email.isValid('invalid')).toEqual({ valid: false, error: expect.any(String) })
  })
})
