<template>
  <div v-if="loading" class="mb-6 flex items-center justify-center text-white bg-blue-600/30 dark:bg-blue-800/50 backdrop-blur-md rounded-xl p-3 shadow-lg transform transition-all duration-500 hover:scale-[1.02]">
    <div class="flex items-center space-x-3">
      <div class="relative">
        <svg class="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <div class="absolute inset-0 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-xl"></div>
      </div>
      <span class="font-medium">กำลังค้นหาตำแหน่งของคุณ...</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>