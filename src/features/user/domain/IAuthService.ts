import { Email } from './Email'
import { Password } from './Password'
import type { UserReadDTO } from '../application/queries/dto/UserReadDTO'

export interface SignUpInput {
  email: Email
  password: Password
}

export interface SignInInput {
  email: Email
  password: Password
}

export interface AuthResult {
  id: string
  email: string
  createdAt: Date
}

export interface IAuthService {
  signUp(input: SignUpInput): Promise<AuthResult>
  signIn(input: SignInInput): Promise<AuthResult>
  signOut(): Promise<void>
  getCurrentUser(): Promise<UserReadDTO | null>
}
