<template>
  <div :class="['min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-gradient-to-br relative', 
    isDarkMode ? 'from-gray-900 via-dark-blue-800 to-blue-900' : dynamicBackground
  ]">
    <!-- Weather Animation Component -->
    <WeatherAnimation :animation-type="weatherAnimationType" />
    <!-- Theme Toggle Component -->
    <ThemeToggle v-model="isDarkMode" />

    <div class="max-w-md w-full mx-auto">

      <!-- Header Component -->
      <Header />
      
      <!-- Location Status Component -->
      <LocationStatus :loading="loadingLocation" />

      <!-- Search Box Component with higher stacking context -->
      <div class="relative" style="z-index: 50;">
        <SearchBox 
          v-model="city"
          @search="fetchWeatherByCity"
          @get-user-location="getUserLocation"
        />
      </div>

      <!-- Weather Card Component with lower stacking context -->
      <div class="relative" style="z-index: 10;">
        <WeatherCard 
          v-if="weather" 
          :weather="weather"
        />
      </div>

      <!-- Error Display Component -->
      <ErrorDisplay :error="error" />
      
      <!-- Footer -->
      <Footer />

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRuntimeConfig } from '#app'
import SearchBox from '~/components/SearchBox.vue'
import WeatherCard from '~/components/WeatherCard.vue'
import ErrorDisplay from '~/components/ErrorDisplay.vue'
import LocationStatus from '~/components/LocationStatus.vue'
import ThemeToggle from '~/components/ThemeToggle.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import WeatherAnimation from '~/components/WeatherAnimation.vue'

// Import composables
import { useWeather } from '~/composables/useWeather'
import { useGeolocation } from '~/composables/useGeolocation'
import { useWeatherUI } from '~/composables/useWeatherUI'

// Setup reactive state
const city = ref('')
const isDarkMode = ref(false)

// Initialize weather UI composable
const { backgroundGradient, weatherAnimation: weatherAnimationType, setWeatherCondition } = useWeatherUI()

// Computed property for dynamic background
const dynamicBackground = computed(() => {
  return backgroundGradient.value
})

// Get API key from runtime config
const runtimeConfig = useRuntimeConfig()
const API_KEY = runtimeConfig.public.apiKey

// Initialize composables
const { weather, error, loading: loadingWeather, fetchWeatherByCity: fetchWeatherByCityName, fetchWeatherByCoords } = useWeather()
const { coords: userCoords, loading: loadingLocation, getCurrentPosition } = useGeolocation()
const { weatherAnimation } = useWeatherUI()

// Fetch weather by city name
const fetchWeatherByCity = async () => {
  await fetchWeatherByCityName(city.value, API_KEY)
}

// Get user location and fetch weather
const getUserLocation = async () => {
  try {
    const coords = await getCurrentPosition()
    if (coords) {
      await fetchWeatherByCoords(coords.lat, coords.lon, API_KEY)
    }
  } catch (err) {
    console.error('Error getting user location:', err)
  }
}

// 🔹 เรียกใช้เมื่อเข้าเว็บ
onMounted(() => {
  // Check if dark mode is enabled from localStorage or system preference
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
  
  // Watch for theme changes to save to localStorage
  watch(() => isDarkMode.value, (newValue) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', newValue ? 'true' : 'false')
    }
  })

  // Watch for weather changes to update UI
  watch(() => weather.value, (newWeather) => {
    if (newWeather && newWeather.weather && newWeather.weather[0]) {
      // Update the weather UI based on the weather condition ID
      setWeatherCondition(newWeather.weather[0].id)
    }
  })
  
  // Try to get user location
  getUserLocation()
})
</script>

<style scoped>
/* Custom styles for the weather app */

.weather-icon img {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Responsive adjustments */
/* @media (max-width: 640px) {
  .text-5xl {
    font-size: 2.5rem;
  }
} */
</style>