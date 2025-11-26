<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '@/app/layout/MainLayout.vue'
import { useAuthStore } from '@/features/auth/store/useAuthStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isAuthPage = computed(() => {
  return route.path === '/signin' || route.path === '/signup'
})

onMounted(async () => {
  await router.isReady()

  if (route.path !== '/signin' && route.path !== '/signup') {
    try {
      await authStore.loadCurrentUser()
      if (!authStore.user) {
        authStore.clearError()
      }
    } catch (error) {
      //TODO add proper logging here
      authStore.clearError()
    }
  }
})
</script>

<template>
  <MainLayout v-if="!isAuthPage">
    <router-view />
  </MainLayout>
  <router-view v-else />
</template>

<style scoped></style>
