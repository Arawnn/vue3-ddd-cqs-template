import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useUserReadStore } from '@/features/user/store/useUserReadStore'

export async function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> {
  const userReadStore = useUserReadStore()
  const requiresAuth = to.meta.requiresAuth as boolean
  const isAuthPage = to.name === 'signin' || to.name === 'signup'

  if (!userReadStore.user && !userReadStore.isLoading && !isAuthPage) {
    try {
      await userReadStore.loadCurrentUser()
      if (!userReadStore.user) {
        userReadStore.clearError()
      }
    } catch (error) {
      console.error('Failed to load user:', error)
      userReadStore.clearError()
    }
  }

  const isAuthenticated = !!userReadStore.user

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'signin', query: { redirect: to.fullPath } })
  } else if (isAuthPage && isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
}
