import { defineStore } from 'pinia'
import { ref, inject } from 'vue'
import { User } from '../domain/User'
import { Email } from '../domain/Email'
import { Password } from '../domain/Password'
import { AuthCommandFactoryKey, AuthQueryFactoryKey } from '@/app/providers/tokens'
import type { IAuthCommandFactory } from '../application/commands/AuthCommandFactory'
import type { IAuthQueryFactory } from '../application/queries/AuthQueryFactory'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const authCommandFactory = inject<IAuthCommandFactory>(AuthCommandFactoryKey)!
  const authQueryFactory = inject<IAuthQueryFactory>(AuthQueryFactoryKey)!

  const signUp = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null

      const emailVO = new Email(email)
      const passwordVO = new Password(password)

      const command = authCommandFactory.createSignUpCommand()
      user.value = await command.execute({ email: emailVO, password: passwordVO })
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

      const emailVO = new Email(email)
      const passwordVO = new Password(password)

      const command = authCommandFactory.createSignInCommand()
      user.value = (await command?.execute({ email: emailVO, password: passwordVO })) ?? null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to sign in'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const loadCurrentUser = async () => {
    try {
      isLoading.value = true
      error.value = null

      const query = authQueryFactory.createGetCurrentUserQuery()
      user.value = await query.execute()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load user'
    } finally {
      isLoading.value = false
    }
  }

  const signOut = async () => {
    try {
      isLoading.value = true
      error.value = null

      const command = authCommandFactory.createSignOutCommand()
      await command.execute()
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
    loadCurrentUser,
    clearError,
  }
})
