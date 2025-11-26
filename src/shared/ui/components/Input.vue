<script setup lang="ts">
interface Props {
  type?: string
  label?: string
  placeholder?: string
  modelValue: string
  error?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-semibold text-gray-700 mb-2 transition-colors">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <div class="relative">
      <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :required="required"
        :class="[
          'w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
          'disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60',
          'placeholder:text-gray-400',
          error
            ? 'border-red-400 focus:ring-red-500/20 focus:border-red-500 bg-red-50/50'
            : 'border-gray-200 focus:border-blue-500 bg-white hover:border-gray-300',
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600 font-medium flex items-center gap-1">
      <svg
        class="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      {{ error }}
    </p>
  </div>
</template>
