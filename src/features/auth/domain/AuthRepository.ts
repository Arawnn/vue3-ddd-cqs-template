import { User } from './User'
import { Email } from './Email'
import { Password } from './Password'

export interface SignUpInput {
  email: Email
  password: Password
}

export interface SignInInput {
  email: Email
  password: Password
}

export interface AuthRepository {
  signUp(input: SignUpInput): Promise<User>
  signIn(input: SignInInput): Promise<User>
  getCurrentUser(): Promise<User | null>
  signOut(): Promise<void>
}
