<template>
  <div v-if="error" class="mt-6 p-4 bg-red-500/70 dark:bg-red-600/70 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:bg-red-500/80 dark:hover:bg-red-600/80">
    <p class="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-red-200 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      <span class="font-medium">{{ error }}</span>
    </p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  error: {
    type: String,
    default: null
  }
})
</script>
