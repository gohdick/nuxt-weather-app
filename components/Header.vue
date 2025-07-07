<template>
  <!-- Header with Weather Icon -->
  <div class="flex items-center justify-center mb-8">
    <div class="relative">
      <h1 class="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">Weather<span class="text-yellow-300 dark:text-yellow-400">Cast</span></h1>
      <div class="absolute -top-6 -right-10 animate-pulse">
        <span class="text-4xl md:text-5xl">🌦️</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// No props or state needed for this simple component
</script>

<style scoped>
/* Any additional styles can be added here */
</style>