import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/features/user/store/useAuthStore'

export async function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth as boolean
  const isAuthPage = to.name === 'signin' || to.name === 'signup'

  if (!authStore.currentUser && !authStore.isLoading && !isAuthPage) {
    try {
      await authStore.loadCurrentUser()
      if (!authStore.currentUser) {
        authStore.clearError()
      }
    } catch (error) {
      console.error('Failed to load user:', error)
      authStore.clearError()
    }
  }

  const isAuthenticated = !!authStore.currentUser

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'signin', query: { redirect: to.fullPath } })
  } else if (isAuthPage && isAuthenticated) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
}
