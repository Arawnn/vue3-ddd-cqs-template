<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserReadStore } from '@/features/user/store/useUserReadStore'
import { useAuthStore } from '@/features/user/store/useAuthStore'

const authStore = useAuthStore() 
const userReadStore = useUserReadStore()
const router = useRouter()

const userEmail = computed(() => userReadStore.user?.email || '')
const isLoading = computed(() => userReadStore.isLoading)

const handleSignOut = async () => {
  try {
    await authStore.signOut()
    router.push({ name: 'signin' })
  } catch (error) {
    console.error('Failed to sign out:', error)
  }
}
</script>

<template>
  <div class="dashboard-view">
    <div v-if="isLoading" class="loading">
      <p>Loading...</p>
    </div>

    <div v-else class="dashboard-content">
      <div class="welcome-section">
        <h1 class="title">Dashboard</h1>
        <p class="subtitle">Welcome to your dashboard</p>
      </div>

      <div class="user-info-card">
        <div class="card-header">
          <h2>User Information</h2>
        </div>
        <div class="card-body">
          <div class="info-row">
            <span class="label">Email:</span>
            <span class="value">{{ userEmail }}</span>
          </div>
        </div>
      </div>

      <div class="actions">
        <button @click="handleSignOut" class="btn-signout">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 1.125rem;
  color: #6b7280;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.welcome-section {
  text-align: center;
  padding: 2rem 0;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
}

.user-info-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 1.5rem;
}

.card-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.card-body {
  padding: 1.5rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.label {
  font-weight: 600;
  color: #374151;
  min-width: 100px;
}

.value {
  color: #111827;
  font-size: 1rem;
  word-break: break-all;
}

.actions {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}

.btn-signout {
  background: #ef4444;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-signout:hover {
  background: #dc2626;
}

.btn-signout:focus {
  outline: 2px solid #ef4444;
  outline-offset: 2px;
}

@media (max-width: 640px) {
  .title {
    font-size: 2rem;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .label {
    min-width: auto;
  }
}
</style>
