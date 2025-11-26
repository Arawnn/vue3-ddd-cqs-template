<script setup lang="ts">
import { ref } from 'vue'
import Input from '@/shared/ui/components/Input.vue'
import Button from '@/shared/ui/components/Button.vue'
import { Email } from '@/features/auth/domain/Email'
import { Password } from '@/features/auth/domain/Password'

interface Props {
  mode: 'signin' | 'signup'
  loading?: boolean
  error?: string | null
}

withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
})

const emit = defineEmits<{
  submit: [email: string, password: string]
}>()

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')

const validate = (): boolean => {
  emailError.value = ''
  passwordError.value = ''

  const emailValidation = Email.isValid(email.value)
  if (!emailValidation.valid) {
    emailError.value = emailValidation.error || 'Invalid email'
    return false
  }

  const passwordValidation = Password.isValid(password.value)
  if (!passwordValidation.valid) {
    passwordError.value = passwordValidation.error || 'Invalid password'
    return false
  }

  return true
}

const handleSubmit = (e: Event) => {
  e.preventDefault()

  if (!validate()) {
    return
  }

  emit('submit', email.value, password.value)
}
</script>

<template>
  <form @submit="handleSubmit" class="space-y-5">
    <div
      v-if="error"
      class="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 text-red-700 px-4 py-3.5 rounded-xl flex items-center gap-2 shadow-sm animate-in fade-in slide-in-from-top-2"
    >
      <svg
        class="w-5 h-5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="font-medium">{{ error }}</span>
    </div>

    <div class="space-y-5">
      <Input
        v-model="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        :error="emailError"
        required
      />

      <Input
        v-model="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        :error="passwordError"
        required
      />
    </div>

    <div class="pt-2">
      <Button type="submit" :loading="loading" class="w-full">
        {{ mode === 'signin' ? 'Sign In' : 'Create Account' }}
      </Button>
    </div>
  </form>
</template>
