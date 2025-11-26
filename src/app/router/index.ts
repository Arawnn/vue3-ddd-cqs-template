import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards/authGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/features/auth/ui/pages/SignInPage.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/features/auth/ui/pages/SignUpPage.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/features/dashboard/ui/pages/DashboardPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/shared/ui/pages/NotFoundPage.vue'),
    },
  ],
})

router.beforeEach(authGuard)

export default router
