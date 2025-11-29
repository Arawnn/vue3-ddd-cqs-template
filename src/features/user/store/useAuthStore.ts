import { defineStore } from 'pinia'
import { ref, inject } from 'vue'
import { User } from '../domain/User'
import { AuthCommandFactoryKey } from '@/app/providers/tokens'
import type { IAuthCommandFactory } from '../application/commands/AuthCommandFactory' 
import { SignUpCommand } from '../application/commands/SignUpCommand'
import { SignInCommand } from '../application/commands/SignInCommand'
import { SignOutCommand } from '../application/commands/SignOutCommand'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const authCommandFactory = inject<IAuthCommandFactory>(AuthCommandFactoryKey)!

  const signUp = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null
      const signUpCommandHandler = authCommandFactory.createSignUpCommand()
      user.value = await signUpCommandHandler.handle(new SignUpCommand(email, password))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to sign up'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null

      const signInCommandHandler = authCommandFactory.createSignInCommand()
      user.value = await signInCommandHandler.handle(new SignInCommand(email, password))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to sign in'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const signOut = async () => {
    try {
      isLoading.value = true
      error.value = null

      const signOutCommandHandler = authCommandFactory.createSignOutCommand()
      await signOutCommandHandler.handle(new SignOutCommand())
      user.value = null
      error.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to sign out'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    user,
    isLoading,
    error,
    signUp,
    signIn,
    signOut,
    clearError,
  }
})
