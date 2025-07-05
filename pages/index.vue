<template>
  <div :class="['min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-gradient-to-br', isDarkMode ? 'from-gray-900 via-dark-blue-800 to-blue-900' : 'from-blue-500 via-blue-400 to-white-600']">
    <!-- Theme Toggle -->
    <div class="absolute top-4 right-4 z-10">
      <button @click="toggleTheme" class="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-300 shadow-lg">
        <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </div>

    <div class="max-w-md w-full mx-auto">
      <!-- Header with Weather Icon -->
      <div class="flex items-center justify-center mb-8">
        <div class="relative">
          <h1 class="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">Weather<span class="text-yellow-300 dark:text-yellow-400">Cast</span></h1>
          <div class="absolute -top-6 -right-10 animate-pulse">
            <span class="text-4xl md:text-5xl">🌦️</span>
          </div>
        </div>
      </div>
      
      <!-- Location Status -->
      <div v-if="loadingLocation" class="mb-6 flex items-center justify-center text-white bg-blue-600/30 dark:bg-blue-800/50 backdrop-blur-md rounded-xl p-3 shadow-lg transform transition-all duration-500 hover:scale-[1.02]">
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

      <!-- Search Box -->
      <div class="bg-white/20 dark:bg-blue-900/30 backdrop-blur-md rounded-2xl p-5 shadow-xl mb-8 transform transition-all duration-500 hover:shadow-2xl">
        <div class="relative mb-3">
          <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <input
            v-model="city"
            @keyup.enter="fetchWeatherByCity"
            @input="handleInputChange"
            class="w-full p-4 pl-12 pr-12 rounded-xl border-0 bg-white/80 dark:bg-blue-800/40 backdrop-blur-md text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 transition-all duration-300"
            placeholder="พิมพ์ชื่อเมือง เช่น กรุงเทพ, เชียงใหม่"
          />
          <button 
            @click="fetchWeatherByCity" 
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        
        <!-- Location Button -->
        <div class="flex space-x-3">
          <button 
            @click="getUserLocation"
            class="flex-1 py-3 px-4 bg-blue-500/70 hover:bg-blue-600/80 dark:bg-blue-700/70 dark:hover:bg-blue-600/80 text-white font-medium rounded-xl transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>ตำแหน่งของฉัน</span>
          </button>
          <button 
            @click="fetchWeatherByCity" 
            class="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:from-blue-500 dark:to-blue-400 dark:hover:from-blue-600 dark:hover:to-blue-500 text-white font-medium rounded-xl transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>ค้นหา</span>
          </button>
        </div>
      </div>

      <!-- Weather Card -->
      <div v-if="weather" class="bg-white/30 dark:bg-blue-900/30 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ease-in-out transform hover:scale-[1.01]">
        <!-- Weather Header with animated background -->
        <div class="relative p-6 bg-gradient-to-r from-blue-500/60 to-blue-400/60 dark:from-blue-700/60 dark:to-blue-600/60 text-white overflow-hidden">
          <!-- Animated weather particles -->
          <div class="absolute inset-0 overflow-hidden">
            <div v-for="i in 8" :key="i" class="weather-particle"></div>
          </div>
          
          <div class="relative z-10 flex justify-between items-center">
            <div>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <h2 class="text-2xl font-bold">{{ weather.name }}, {{ weather.sys.country }}</h2>
              </div>
              <p class="text-sm opacity-90 mt-1 ml-7">{{ getCurrentDate() }}</p>
            </div>
            <div class="weather-icon">
              <img 
                :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" 
                :alt="weather.weather[0].description"
                class="w-20 h-20 drop-shadow-lg transform hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
        
        <!-- Weather Details -->
        <div class="p-6 text-gray-800 dark:text-gray-100">
          <div class="flex items-end mb-6">
            <span class="text-6xl font-bold text-blue-800 dark:text-blue-300">{{ Math.round(weather.main.temp) }}°</span>
            <span class="text-2xl ml-2 mb-2 text-blue-700 dark:text-blue-400">C</span>
            <div class="ml-auto flex flex-col items-end">
              <span class="text-sm text-gray-500 dark:text-gray-400">สูงสุด/ต่ำสุด</span>
              <span class="text-lg font-medium">{{ Math.round(weather.main.temp_max) }}° / {{ Math.round(weather.main.temp_min) }}°</span>
            </div>
          </div>
          
          <div class="flex items-center mb-6">
            <div class="weather-description-icon mr-3">
              <img 
                :src="getWeatherIcon(weather.weather[0].main)" 
                :alt="weather.weather[0].main"
                class="w-10 h-10"
              />
            </div>
            <p class="text-xl font-medium capitalize">{{ weather.weather[0].description }}</p>
          </div>
          
          <!-- Weather Details Grid -->
          <div class="grid grid-cols-2 gap-6 mb-4">
            <!-- Humidity -->
            <div class="bg-blue-100/50 dark:bg-blue-800/30 rounded-xl p-4 flex items-center transform transition-all duration-300 hover:bg-blue-200/50 dark:hover:bg-blue-700/30">
              <div class="p-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg mr-4">
                <img src="/water-droplet-icon.svg" class="h-6 w-6 filter invert" />
              </div>
              <div class="w-full">
                <p class="text-xs text-gray-500 dark:text-gray-400">ความชื้น</p>
                <p class="text-lg font-semibold">
                  <span v-if="weather.main.humidity > 70" class="text-blue-600 dark:text-blue-400">💧 {{ weather.main.humidity }}%</span>
                  <span v-else-if="weather.main.humidity < 30" class="text-yellow-600 dark:text-yellow-400">☀️ {{ weather.main.humidity }}%</span>
                  <span v-else>🌦️ {{ weather.main.humidity }}%</span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span v-if="weather.main.humidity > 70">ความชื้นสูง: อากาศชื้น</span>
                  <span v-else-if="weather.main.humidity < 30">ความชื้นต่ำ: อากาศแห้ง</span>
                  <span v-else>ความชื้นปกติ</span>
                </p>
              </div>
            </div>
            
            <!-- Wind -->
            <div class="bg-blue-100/50 dark:bg-blue-800/30 rounded-xl p-4 flex items-center transform transition-all duration-300 hover:bg-blue-200/50 dark:hover:bg-blue-700/30">
              <div class="p-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg mr-4">
                <img src="/cloud-wind-icon.svg" class="h-6 w-6 filter invert" alt="Wind" />
              </div>
              <div class="w-full">
                <p class="text-xs text-gray-500 dark:text-gray-400">ลม</p>
                <p class="text-lg font-semibold">
                  <span v-if="weather.wind.speed > 10" class="text-red-600 dark:text-red-400">🌪️ {{ weather.wind.speed }} m/s</span>
                  <span v-else-if="weather.wind.speed > 5" class="text-yellow-600 dark:text-yellow-400">💨 {{ weather.wind.speed }} m/s</span>
                  <span v-else>🍃 {{ weather.wind.speed }} m/s</span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span v-if="weather.wind.speed > 10">ลมแรง: ระวังอันตราย</span>
                  <span v-else-if="weather.wind.speed > 5">ลมปานกลาง</span>
                  <span v-else>ลมเบา: สบาย</span>
                </p>
              </div>
            </div>
            
            <!-- Pressure -->
            <div class="bg-blue-100/50 dark:bg-blue-800/30 rounded-xl p-4 flex items-center transform transition-all duration-300 hover:bg-blue-200/50 dark:hover:bg-blue-700/30">
              <div class="p-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg mr-4">
                <img src="/smoke-icon.svg" class="h-6 w-6 filter invert" alt="Pressure" />
              </div>
              <div class="w-full">
                <p class="text-xs text-gray-500 dark:text-gray-400">ความกดอากาศ</p>
                <p class="text-lg font-semibold">
                  <span v-if="weather.main.pressure >= 1013" class="text-blue-600 dark:text-blue-400">🔵 {{ weather.main.pressure }}hPa</span>
                  <span v-else class="text-red-600 dark:text-red-400">🔴 {{ weather.main.pressure }}hPa</span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span v-if="weather.main.pressure >= 1013">ความกดอากาศสูง: อากาศแจ่มใส</span>
                  <span v-else>ความกดอากาศต่ำ: มีแนวโน้มฝนตก</span>
                </p>
              </div>
            </div>
            
            <!-- Feels Like -->
            <div class="bg-blue-100/50 dark:bg-blue-800/30 rounded-xl p-4 flex items-center transform transition-all duration-300 hover:bg-blue-200/50 dark:hover:bg-blue-700/30">
              <div class="p-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg mr-4">
                <img src="/awareness-icon.svg" class="h-6 w-6 filter invert" alt="Feels Like" />
              </div>
              <div class="w-full">
                <p class="text-xs text-gray-500 dark:text-gray-400">รู้สึกเหมือน</p>
                <p class="text-lg font-semibold">
                  <span v-if="weather.main.feels_like >= 35" class="text-red-600 dark:text-red-400">🔥 {{ Math.round(weather.main.feels_like) }}°C</span>
                  <span v-else-if="weather.main.feels_like >= 30" class="text-orange-600 dark:text-orange-400">🌡️ {{ Math.round(weather.main.feels_like) }}°C</span>
                  <span v-else-if="weather.main.feels_like <= 10" class="text-blue-600 dark:text-blue-400">❄️ {{ Math.round(weather.main.feels_like) }}°C</span>
                  <span v-else>🌤️ {{ Math.round(weather.main.feels_like) }}°C</span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span v-if="weather.main.feels_like >= 35">ร้อนมาก: ระวังอันตรายจากความร้อน</span>
                  <span v-else-if="weather.main.feels_like >= 30">ร้อน: ควรดื่มน้ำมากๆ</span>
                  <span v-else-if="weather.main.feels_like <= 10">หนาว: ควรใส่เสื้อกันหนาว</span>
                  <span v-else>อากาศดี: สบาย</span>
                </p>
              </div>
            </div>
          </div>
          
          <!-- Last Updated -->
           
          <div class="text-center mt-4 text-sm text-white dark:text-white">
            อัพเดตล่าสุด: {{ getLastUpdated() }}  {{ getCurrentDate() }}
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mt-6 p-4 bg-red-500/70 dark:bg-red-600/70 text-white rounded-xl shadow-lg transform transition-all duration-300 hover:bg-red-500/80 dark:hover:bg-red-600/80">
        <p class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3 text-red-200 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <span class="font-medium">{{ error }}</span>
        </p>
      </div>
      
      <!-- Footer -->
      <div class="mt-8 text-center text-white/70 dark:text-white/50 text-sm">
        <p>© {{ new Date().getFullYear() }} WeatherCast | <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">https://openweathermap.org</a>  <br>บริการข้อมูลสภาพอากาศคุณภาพสูง | พัฒนาโดย Mr.Thirasak Simtong</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRuntimeConfig } from '#app'

const city = ref('')
const weather = ref(null)
const error = ref(null)
const loadingLocation = ref(false)
const userCoords = ref(null)
const isDarkMode = ref(false)

const runtimeConfig = useRuntimeConfig()
const API_KEY = runtimeConfig.public.apiKey

// Get current formatted date
const getCurrentDate = () => {
  const now = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return now.toLocaleDateString('th-TH', options)
}

// Get last updated time
const getLastUpdated = () => {
  const now = new Date()
  return now.toLocaleTimeString('th-TH')
}

// Toggle dark mode
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Get weather icon based on weather condition
const getWeatherIcon = (condition) => {
  const iconMap = {
    'Clear': 'https://openweathermap.org/img/wn/01d@2x.png',
    'Clouds': 'https://openweathermap.org/img/wn/03d@2x.png',
    'Rain': 'https://openweathermap.org/img/wn/10d@2x.png',
    'Drizzle': 'https://openweathermap.org/img/wn/09d@2x.png',
    'Thunderstorm': 'https://openweathermap.org/img/wn/11d@2x.png',
    'Snow': 'https://openweathermap.org/img/wn/13d@2x.png',
    'Mist': 'https://openweathermap.org/img/wn/50d@2x.png',
    'Fog': 'https://openweathermap.org/img/wn/50d@2x.png',
    'Haze': 'https://openweathermap.org/img/wn/50d@2x.png'
  }
  
  return iconMap[condition] || 'https://openweathermap.org/img/wn/01d@2x.png'
}

// 🔹 ดึงข้อมูลตามพิกัด
const fetchWeatherByCoords = async (lat, lon) => {
  try {
    loadingLocation.value = true
    error.value = null // Clear previous errors
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=th`)
    if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลจากตำแหน่งปัจจุบันได้')
    const data = await res.json()
    weather.value = data
    error.value = null
  } catch (err) {
    console.error('Error fetching weather by coords:', err)
    error.value = 'ไม่สามารถโหลดข้อมูลจากตำแหน่งปัจจุบันได้'
    weather.value = null
  } finally {
    loadingLocation.value = false
  }
}

// 🔹 ดึงข้อมูลจากชื่อเมือง
const fetchWeatherByCity = async () => {
  if (!city.value.trim()) {
    error.value = 'กรุณาใส่ชื่อเมือง'
    return
  }
  
  try {
    loadingLocation.value = true
    error.value = null // Clear previous errors
    // เข้ารหัส URL เพื่อรองรับภาษาไทย
    const encodedCity = encodeURIComponent(city.value.trim())
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&units=metric&appid=${API_KEY}&lang=th`)
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('ไม่พบเมืองนี้ กรุณาตรวจสอบชื่อเมืองอีกครั้ง')
      } else {
        throw new Error('เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง')
      }
    }
    const data = await res.json()
    weather.value = data
    error.value = null
  } catch (err) {
    console.error('Error fetching weather by city:', err)
    error.value = err.message || 'เกิดข้อผิดพลาดในการค้นหา'
    weather.value = null
  } finally {
    loadingLocation.value = false
  }
}

// Handle input change - if cleared, return to user location
const handleInputChange = () => {
  if (city.value.trim() === '' && userCoords.value) {
    fetchWeatherByCoords(userCoords.value.latitude, userCoords.value.longitude)
  }
}

// Get user location function
const getUserLocation = () => {
  if (navigator.geolocation) {
    loadingLocation.value = true
    error.value = null
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        userCoords.value = { latitude, longitude }
        fetchWeatherByCoords(latitude, longitude)
      },
      (err) => {
        console.error('Geolocation error:', err)
        error.value = 'ไม่สามารถเข้าถึงตำแหน่งได้ กรุณาอนุญาตการเข้าถึงตำแหน่ง'
        loadingLocation.value = false
      },
      {
        timeout: 10000, // 10 second timeout
        enableHighAccuracy: true
      }
    )
  } else {
    error.value = 'เบราว์เซอร์ไม่รองรับการเข้าถึงตำแหน่ง'
    loadingLocation.value = false
  }
}

// This handleInputChange function is already defined elsewhere, so removing duplicate

// 🔹 เรียกใช้เมื่อเข้าเว็บ
onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        // Store user coordinates for later use
        userCoords.value = { latitude, longitude }
        fetchWeatherByCoords(latitude, longitude)
      },
      (err) => {
        console.error('Initial geolocation error:', err)
        error.value = 'ไม่สามารถเข้าถึงตำแหน่งได้ กรุณาค้นหาด้วยชื่อเมือง'
        loadingLocation.value = false
      },
      {
        timeout: 10000, // 10 second timeout
        enableHighAccuracy: true
      }
    )
  } else {
    error.value = 'เบราว์เซอร์ไม่รองรับการเข้าถึงตำแหน่ง กรุณาค้นหาด้วยชื่อเมือง'
    loadingLocation.value = false
  }
})
</script>

<style scoped>
/* Custom styles for the weather app */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

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
@media (max-width: 640px) {
  .text-5xl {
    font-size: 2.5rem;
  }
}
</style>