import type { AuthResult, SignInInput, SignUpInput } from '../domain/IAuthService'
import {
  EmailAlreadyExistsError,
  EmailNotConfirmedError,
  InvalidCredentialsError,
  WeakPasswordError,
} from '../domain/errors'
import { supabaseClient } from './supabaseClient'
import { UserMapper } from './UserMapper'
import type { IAuthService } from '../domain/IAuthService'
import { UserReadMapper } from './UserReadMapper'
import type { User } from '../domain'

export class SupabaseAuthService implements IAuthService {
  async signUp(input: SignUpInput): Promise<AuthResult> {
    const { data, error } = await supabaseClient.auth.signUp({
      email: input.email.value,
      password: input.password.value,
    })

    if (error) {
      if (error.message.includes('already registered') || error.code === 'user_already_exists') {
        throw new EmailAlreadyExistsError(input.email.value, error)
      }
      if (error.code === 'weak_password') {
        const errorMessage =
          error.message ||
          'Password does not meet security requirements. Password should be at least 12 characters.'
        throw new WeakPasswordError(errorMessage, error)
      }
      const errorMessage = error.message || 'Failed to create account'
      throw new InvalidCredentialsError(errorMessage, error)
    }

    if (!data.user) {
      throw new Error('Failed to create user')
    }

    return {
      id: data.user.id,
      email: data.user.email ?? '',
      createdAt: new Date(data.user.created_at),
    }
  }

  async signIn(input: SignInInput): Promise<AuthResult> {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: input.email.value,
      password: input.password.value,
    })

    if (error) {
      if (error.code === 'email_not_confirmed') {
        throw new EmailNotConfirmedError(error.message, error)
      }
      if (error.code === 'invalid_credentials' || error.code === 'invalid_grant') {
        const errorMessage = error.message || 'Invalid email or password'
        throw new InvalidCredentialsError(errorMessage, error)
      }
      const errorMessage = error.message || 'Failed to sign in'
      throw new InvalidCredentialsError(errorMessage, error)
    }

    if (!data.user) {
      throw new InvalidCredentialsError()
    }

    const user = UserMapper.toDomain(data.user)
    return {
      id: data.user.id,
      email: user.email.value,
      createdAt: user.createdAt,
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const { data, error } = await supabaseClient.auth.getUser()
    if (error) {
      if (error.code === 'not_authenticated') {
        return null
      }
      throw new Error('Failed to get current user')
    }

    if (!data.user) {
      return null
    }

    return UserMapper.toDomain(data.user)
  }

  async signOut(): Promise<void> {
    await supabaseClient.auth.signOut()
  }
}
