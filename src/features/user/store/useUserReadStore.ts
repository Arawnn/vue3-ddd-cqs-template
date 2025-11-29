import { defineStore } from 'pinia'
import { computed, inject, ref } from 'vue'
import type { UserReadDTO } from '../application/queries/dto/UserReadDTO'
import { GetCurrentUserQuery } from '../application/queries/GetCurrentUserQuery'
import { AuthQueryFactoryKey } from '@/app/providers/tokens'
import type { IAuthQueryFactory } from '../application/queries/AuthQueryFactory'
import { UserViewModels } from '../ui/viewmodels/UserViewModels'

export const useUserReadStore = defineStore('userRead', () => {
    const userReadDTO = ref<UserReadDTO | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)
 
    const authQueryFactory = inject<IAuthQueryFactory>(AuthQueryFactoryKey)!

    const user = computed(() => {
        return userReadDTO.value ? new UserViewModels(userReadDTO.value) : null
    })


    const loadCurrentUser = async () => {
        try {
          isLoading.value = true
          error.value = null
    
          const getCurrentUserQueryHandler = authQueryFactory.createGetCurrentUserQuery()
          userReadDTO.value = await getCurrentUserQueryHandler.query(new GetCurrentUserQuery(null))
        } catch (err) {
          error.value = err instanceof Error ? err.message : 'Failed to load user'
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
    loadCurrentUser,
    clearError,
    }
})