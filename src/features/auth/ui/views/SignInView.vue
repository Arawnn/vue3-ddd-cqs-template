<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/useAuthStore'
import Card from '@/shared/ui/components/Card.vue'
import AuthForm from '../components/AuthForm.vue'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  authStore.clearError()
})

const handleSubmit = async (email: string, password: string) => {
  try {
    await authStore.signIn(email, password)
    router.push('/')
  } catch (error) {
    // Error is handled by the store
  }
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12"
  >
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <Card title="Welcome Back" subtitle="Sign in to your account to continue">
        <AuthForm
          mode="signin"
          :loading="authStore.isLoading"
          :error="authStore.error"
          @submit="handleSubmit"
        />
        <div class="mt-6 text-center text-sm">
          <span class="text-gray-600">Don't have an account?</span>
          <router-link
            to="/signup"
            class="text-blue-600 hover:text-blue-700 font-semibold ml-1 transition-colors duration-200 hover:underline"
          >
            Sign up
          </router-link>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped>
@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
