<template>
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
        @keyup.enter="handleEnterKey"
        @keydown.down.prevent="navigateSuggestion(1)"
        @keydown.up.prevent="navigateSuggestion(-1)"
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
      
      <!-- Autocomplete Suggestions -->
      <div v-if="showSuggestions && filteredCities.length > 0 && city.trim()" class="absolute z-[100] w-full mt-1 bg-white dark:bg-blue-800 rounded-xl shadow-lg max-h-60 overflow-y-auto border border-blue-200 dark:border-blue-700">
        <ul class="py-1">
          <li 
            v-for="(suggestion, index) in filteredCities" 
            :key="index" 
            @click="selectCity(suggestion)"
            :class="[
              'px-4 py-2 cursor-pointer flex items-center text-gray-800 dark:text-white transition-colors duration-200',
              selectedIndex === index ? 'bg-blue-100 dark:bg-blue-700' : 'hover:bg-blue-100 dark:hover:bg-blue-700'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span v-html="highlightMatch(suggestion, city)"></span>
          </li>
        </ul>
      </div>
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
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import locationData from '~/composables/useLocations'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'search', 'get-user-location'])

const city = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const showSuggestions = ref(true)
const cities = ref(locationData.cities)
const selectedIndex = ref(-1)

const filteredCities = computed(() => {
  if (!city.value.trim()) return []
  
  const searchTerm = city.value.trim().toLowerCase()
  return cities.value.filter(c => 
    c.toLowerCase().includes(searchTerm)
  ).slice(0, 8) // Limit to 8 suggestions for better UX
})

const highlightMatch = (text, query) => {
  if (!query.trim()) return text
  
  const regex = new RegExp(`(${query.trim()})`, 'gi')
  return text.replace(regex, '<span class="font-bold text-blue-600 dark:text-blue-300">$1</span>')
}

const selectCity = (selectedCity) => {
  city.value = selectedCity
  showSuggestions.value = false // Hide the suggestions list after selection
  fetchWeatherByCity()
}

const handleInputChange = () => {
  showSuggestions.value = true // Show suggestions when user types
  selectedIndex.value = -1 // Reset selection when typing
  emit('update:modelValue', city.value)
  
  // If the search field is completely cleared, automatically use current location
  if (city.value === '') {
    getUserLocation()
  }
}

const navigateSuggestion = (direction) => {
  if (!filteredCities.value.length) return
  
  if (direction === 1) { // Down arrow
    selectedIndex.value = (selectedIndex.value < filteredCities.value.length - 1) ? selectedIndex.value + 1 : 0
  } else { // Up arrow
    selectedIndex.value = (selectedIndex.value > 0) ? selectedIndex.value - 1 : filteredCities.value.length - 1
  }
  
  // Scroll the selected item into view if needed
  nextTick(() => {
    const selectedElement = document.querySelector('.bg-blue-100, .dark\\:bg-blue-700')
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest' })
    }
  })
}

const handleEnterKey = () => {
  if (selectedIndex.value >= 0 && filteredCities.value.length > 0) {
    // If an item is selected in the dropdown, select it
    selectCity(filteredCities.value[selectedIndex.value])
  } else {
    // Otherwise, perform normal search
    fetchWeatherByCity()
  }
}

const fetchWeatherByCity = () => {
  emit('search')
}

const getUserLocation = () => {
  emit('get-user-location')
}
</script>