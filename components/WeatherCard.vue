<template>
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
            <div class="flex items-center space-x-3">
              <h2 class="text-2xl font-bold">{{ weather.name }}</h2>
              <h4 class="text-xl">{{ getCountryName(weather.sys.country) }}</h4>
            </div>
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
          <span class="text-sm text-white dark:text-gray-300">สูงสุด/ต่ำสุด</span>
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <!-- Humidity -->
        <div class="bg-blue-100/50 dark:bg-blue-800/30 rounded-xl p-4 flex items-center transform transition-all duration-300 hover:bg-blue-200/50 dark:hover:bg-blue-700/30">
          <div class="p-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg mr-4">
            <img src="/water-droplet-icon.svg" class="h-6 w-6 filter invert" />
          </div>
          <div class="w-full">
            <p class="text-xs text-white dark:text-gray-300">ความชื้น</p>
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
        <div class="bg-blue-100/50 dark:bg-blue-800/30 rounded-xl p-4 flex items-center transform transition-all duration-300 hover:bg-blue-200/50 dark:hover:bg-blue-700/30 w-full">
          <div class="p-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg mr-4">
            <img src="/cloud-wind-icon.svg" class="h-6 w-6 filter invert" alt="Wind" />
          </div>
          <div class="w-full">
            <p class="text-xs text-white dark:text-gray-300">ลม</p>
            
            <p class="text-base font-semibold">
              <span v-if="weather.wind.speed > 10" class="text-red-600 dark:text-red-400">🌪️ {{ Math.round(weather.wind.speed * 3.6) }}&nbsp;กม./ชม.</span>
              <span v-else-if="weather.wind.speed > 5" class="text-yellow-600 dark:text-yellow-400">💨 {{ Math.round(weather.wind.speed * 3.6) }}&nbsp;กม./ชม.</span>
              <span v-else>🍃 {{ Math.round(weather.wind.speed * 3.6) }}&nbsp;กม./ชม.</span>
            </p>
            <p class="text-xs text-white dark:text-gray-300 mt-1">
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
            <p class="text-xs text-white dark:text-gray-300">ความกดอากาศ</p>
            <p class="text-lg font-semibold">
              <span v-if="weather.main.pressure >= 1013" class="text-blue-600 dark:text-blue-400">🔵 {{ weather.main.pressure }}hPa</span>
              <span v-else class="text-red-600 dark:text-red-400">🔴 {{ weather.main.pressure }}hPa</span>
            </p>
            <p class="text-xs text-white dark:text-gray-300 mt-1">
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
            <p class="text-xs text-white dark:text-gray-300">รู้สึกเหมือน</p>
            <p class="text-lg font-semibold">
              <span v-if="weather.main.feels_like >= 35" class="text-red-600 dark:text-red-400">🔥 {{ Math.round(weather.main.feels_like) }}°C</span>
              <span v-else-if="weather.main.feels_like >= 30" class="text-orange-600 dark:text-orange-400">🌡️ {{ Math.round(weather.main.feels_like) }}°C</span>
              <span v-else-if="weather.main.feels_like <= 10" class="text-blue-600 dark:text-blue-400">❄️ {{ Math.round(weather.main.feels_like) }}°C</span>
              <span v-else>🌤️ {{ Math.round(weather.main.feels_like) }}°C</span>
            </p>
            <p class="text-xs text-white dark:text-gray-300 mt-1">
              <span v-if="weather.main.feels_like >= 35">ร้อนมาก: ระวังอันตรายจากความร้อน</span>
              <span v-else-if="weather.main.feels_like >= 30">ร้อน: ควรดื่มน้ำมากๆ</span>
              <span v-else-if="weather.main.feels_like <= 10">หนาว: ควรใส่เสื้อกันหนาว</span>
              <span v-else>อากาศดี: สบาย</span>
            </p>
          </div>
        </div>
      </div>
      
      <!-- Weather Insights Section -->
      <WeatherInsights :weather="weather" />
      
      <!-- Last Updated -->
      <div class="text-center mt-4 text-sm text-white-700 dark:text-white-700">
        อัพเดตล่าสุด: {{ getLastUpdated() }}  {{ getCurrentDate() }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import WeatherInsights from './WeatherInsights.vue'

const props = defineProps({
  weather: {
    type: Object,
    required: true
  }
})

const getCurrentDate = () => {
  const now = new Date()
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return now.toLocaleDateString('th-TH', options)
}

const getLastUpdated = () => {
  const now = new Date()
  return now.toLocaleTimeString('th-TH')
}

const getCountryName = (countryCode) => {
  const regionNames = new Intl.DisplayNames(['th'], { type: 'region' })
  try {
    return regionNames.of(countryCode)
  } catch (error) {
    return countryCode
  }
}

const getWeatherIcon = (weatherMain) => {
  const iconMap = {
    'Clear': '/sun-icon.svg',
    'Clouds': '/cloud-icon.svg',
    'Rain': '/rain-icon.svg',
    'Drizzle': '/drizzle-icon.svg',
    'Thunderstorm': '/thunder-icon.svg',
    'Snow': '/snow-icon.svg',
    'Mist': '/mist-icon.svg',
    'Smoke': '/smoke-icon.svg',
    'Haze': '/haze-icon.svg',
    'Dust': '/dust-icon.svg',
    'Fog': '/fog-icon.svg',
    'Sand': '/sand-icon.svg',
    'Ash': '/ash-icon.svg',
    'Squall': '/squall-icon.svg',
    'Tornado': '/tornado-icon.svg'
  }
  
  return iconMap[weatherMain] || '/default-weather-icon.svg'
}
</script>

<style scoped>
.weather-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float 15s infinite linear;
}

.weather-particle:nth-child(1) { top: 20%; left: 10%; animation-duration: 20s; }
.weather-particle:nth-child(2) { top: 60%; left: 20%; animation-duration: 18s; animation-delay: 1s; }
.weather-particle:nth-child(3) { top: 40%; left: 30%; animation-duration: 16s; animation-delay: 2s; }
.weather-particle:nth-child(4) { top: 10%; left: 40%; animation-duration: 19s; animation-delay: 0.5s; }
.weather-particle:nth-child(5) { top: 70%; left: 50%; animation-duration: 17s; animation-delay: 1.5s; }
.weather-particle:nth-child(6) { top: 30%; left: 60%; animation-duration: 15s; animation-delay: 2.5s; }
.weather-particle:nth-child(7) { top: 50%; left: 70%; animation-duration: 22s; animation-delay: 1s; }
.weather-particle:nth-child(8) { top: 15%; left: 80%; animation-duration: 25s; animation-delay: 0.7s; }

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(10px, 10px) rotate(180deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}
</style>