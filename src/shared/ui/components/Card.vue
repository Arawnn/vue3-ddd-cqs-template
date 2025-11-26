<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 transform transition-all duration-300 hover:shadow-3xl"
  >
    <div v-if="title" class="mb-8">
      <h2
        class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-center mb-2"
      >
        {{ title }}
      </h2>
      <p v-if="subtitle" class="text-sm text-gray-500 text-center">{{ subtitle }}</p>
    </div>
    <slot />
  </div>
</template>
