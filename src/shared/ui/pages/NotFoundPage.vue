<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/store/useAuthStore'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => !!authStore.user)

const goHome = () => {
  if (isAuthenticated.value) {
    router.push({ name: 'dashboard' })
  } else {
    router.push({ name: 'signin' })
  }
}
</script>

<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1 class="error-title">Page Not Found</h1>
      <p class="error-message">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <button @click="goHome" class="btn-home">
        {{ isAuthenticated ? 'Go to Dashboard' : 'Go to Sign In' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.not-found-content {
  background: white;
  border-radius: 1rem;
  padding: 3rem 2rem;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.error-code {
  font-size: 6rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  line-height: 1;
}

.error-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 1.5rem 0 1rem;
}

.error-message {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0 0 2rem;
  line-height: 1.6;
}

.btn-home {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.btn-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.btn-home:active {
  transform: translateY(0);
}

.btn-home:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

@media (max-width: 640px) {
  .error-code {
    font-size: 4rem;
  }

  .error-title {
    font-size: 1.5rem;
  }

  .error-message {
    font-size: 1rem;
  }

  .not-found-content {
    padding: 2rem 1.5rem;
  }
}
</style>
