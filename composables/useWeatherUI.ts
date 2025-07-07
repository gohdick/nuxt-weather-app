import { ref, computed } from 'vue'

// Define weather condition types
export type WeatherCondition = 
  | 'clear' 
  | 'clouds' 
  | 'rain' 
  | 'drizzle'
  | 'thunderstorm'
  | 'snow'
  | 'mist'
  | 'fog'
  | 'haze'
  | 'dust'
  | 'sand'
  | 'ash'
  | 'squall'
  | 'tornado'
  | 'smoke'
  | 'default'

// Define time of day
export type TimeOfDay = 'morning' | 'day' | 'evening' | 'night'

export const useWeatherUI = () => {
  const currentCondition = ref<WeatherCondition>('default')
  const timeOfDay = ref<TimeOfDay>('day')

  // Determine time of day based on current hour
  const determineTimeOfDay = (): TimeOfDay => {
    const hour = new Date().getHours()
    
    if (hour >= 5 && hour < 10) return 'morning'
    if (hour >= 10 && hour < 17) return 'day'
    if (hour >= 17 && hour < 20) return 'evening'
    return 'night'
  }

  // Set weather condition based on OpenWeatherMap condition ID
  const setWeatherCondition = (weatherId: number): void => {
    if (weatherId >= 200 && weatherId < 300) {
      currentCondition.value = 'thunderstorm'
    } else if (weatherId >= 300 && weatherId < 400) {
      currentCondition.value = 'drizzle'
    } else if (weatherId >= 500 && weatherId < 600) {
      currentCondition.value = 'rain'
    } else if (weatherId >= 600 && weatherId < 700) {
      currentCondition.value = 'snow'
    } else if (weatherId === 701) {
      currentCondition.value = 'mist'
    } else if (weatherId === 711) {
      currentCondition.value = 'smoke'
    } else if (weatherId === 721) {
      currentCondition.value = 'haze'
    } else if (weatherId === 731 || weatherId === 761) {
      currentCondition.value = 'dust'
    } else if (weatherId === 741) {
      currentCondition.value = 'fog'
    } else if (weatherId === 751) {
      currentCondition.value = 'sand'
    } else if (weatherId === 762) {
      currentCondition.value = 'ash'
    } else if (weatherId === 771) {
      currentCondition.value = 'squall'
    } else if (weatherId === 781) {
      currentCondition.value = 'tornado'
    } else if (weatherId === 800) {
      currentCondition.value = 'clear'
    } else if (weatherId >= 801 && weatherId < 900) {
      currentCondition.value = 'clouds'
    } else {
      currentCondition.value = 'default'
    }
    
    // Update time of day whenever weather changes
    timeOfDay.value = determineTimeOfDay()
  }

  // Generate background gradient based on weather and time of day
  const backgroundGradient = computed(() => {
    // Base gradients by time of day
    const timeGradients = {
      morning: {
        clear: 'from-orange-300 via-blue-300 to-white-200',
        clouds: 'from-gray-300 via-blue-200 to-white-100',
        rain: 'from-gray-400 via-blue-300 to-blue-200',
        drizzle: 'from-gray-300 via-blue-300 to-blue-200',
        thunderstorm: 'from-gray-700 via-purple-600 to-gray-500',
        snow: 'from-blue-100 via-white to-gray-100',
        mist: 'from-gray-300 via-gray-200 to-white-100',
        fog: 'from-gray-400 via-gray-300 to-gray-200',
        haze: 'from-yellow-100 via-gray-200 to-white-100',
        dust: 'from-yellow-200 via-yellow-100 to-gray-200',
        sand: 'from-yellow-300 via-yellow-200 to-yellow-100',
        ash: 'from-gray-500 via-gray-400 to-gray-300',
        squall: 'from-gray-600 via-blue-400 to-gray-300',
        tornado: 'from-gray-700 via-gray-600 to-gray-500',
        smoke: 'from-gray-400 via-gray-300 to-gray-200',
        default: 'from-blue-300 via-blue-200 to-white-100'
      },
      day: {
        clear: 'from-blue-500 via-blue-400 to-white-600',
        clouds: 'from-blue-400 via-gray-300 to-white-200',
        rain: 'from-blue-600 via-blue-500 to-gray-400',
        drizzle: 'from-blue-500 via-blue-400 to-gray-300',
        thunderstorm: 'from-gray-800 via-purple-700 to-gray-600',
        snow: 'from-blue-200 via-white to-gray-200',
        mist: 'from-gray-400 via-gray-300 to-white-200',
        fog: 'from-gray-500 via-gray-400 to-gray-300',
        haze: 'from-yellow-200 via-gray-300 to-white-200',
        dust: 'from-yellow-300 via-yellow-200 to-gray-300',
        sand: 'from-yellow-400 via-yellow-300 to-yellow-200',
        ash: 'from-gray-600 via-gray-500 to-gray-400',
        squall: 'from-gray-700 via-blue-500 to-gray-400',
        tornado: 'from-gray-800 via-gray-700 to-gray-600',
        smoke: 'from-gray-500 via-gray-400 to-gray-300',
        default: 'from-blue-500 via-blue-400 to-white-600'
      },
      evening: {
        clear: 'from-orange-500 via-pink-400 to-blue-600',
        clouds: 'from-gray-500 via-pink-300 to-blue-500',
        rain: 'from-gray-600 via-blue-500 to-blue-700',
        drizzle: 'from-gray-500 via-blue-400 to-blue-600',
        thunderstorm: 'from-gray-800 via-purple-800 to-blue-900',
        snow: 'from-blue-300 via-purple-200 to-gray-300',
        mist: 'from-gray-500 via-gray-400 to-blue-300',
        fog: 'from-gray-600 via-gray-500 to-gray-400',
        haze: 'from-yellow-300 via-orange-300 to-gray-400',
        dust: 'from-yellow-400 via-orange-400 to-gray-500',
        sand: 'from-yellow-500 via-orange-500 to-yellow-400',
        ash: 'from-gray-700 via-gray-600 to-gray-500',
        squall: 'from-gray-700 via-blue-600 to-gray-500',
        tornado: 'from-gray-900 via-gray-800 to-gray-700',
        smoke: 'from-gray-600 via-gray-500 to-gray-400',
        default: 'from-blue-600 via-purple-500 to-blue-800'
      },
      night: {
        clear: 'from-blue-900 via-indigo-800 to-purple-900',
        clouds: 'from-gray-800 via-blue-900 to-gray-900',
        rain: 'from-gray-900 via-blue-800 to-blue-900',
        drizzle: 'from-gray-800 via-blue-700 to-blue-800',
        thunderstorm: 'from-gray-900 via-purple-900 to-black',
        snow: 'from-blue-800 via-blue-900 to-gray-800',
        mist: 'from-gray-800 via-gray-700 to-gray-900',
        fog: 'from-gray-900 via-gray-800 to-gray-900',
        haze: 'from-gray-800 via-yellow-900 to-gray-900',
        dust: 'from-yellow-900 via-gray-800 to-gray-900',
        sand: 'from-yellow-800 via-yellow-900 to-gray-900',
        ash: 'from-gray-900 via-gray-800 to-black',
        squall: 'from-gray-900 via-blue-800 to-gray-800',
        tornado: 'from-gray-900 via-gray-800 to-black',
        smoke: 'from-gray-800 via-gray-700 to-gray-600',
        default: 'from-gray-900 via-dark-blue-800 to-blue-900'
      }
    }
    
    return timeGradients[timeOfDay.value][currentCondition.value] || timeGradients[timeOfDay.value].default
  })

  // Generate animation class based on weather condition
  const weatherAnimation = computed(() => {
    switch (currentCondition.value) {
      case 'rain':
        return 'weather-rain'
      case 'drizzle':
        return 'weather-drizzle'
      case 'snow':
        return 'weather-snow'
      case 'thunderstorm':
        return 'weather-thunder'
      case 'clouds':
        return 'weather-clouds'
      case 'mist':
      case 'fog':
      case 'haze':
        return 'weather-mist'
      case 'dust':
      case 'sand':
      case 'ash':
        return 'weather-dust'
      case 'squall':
      case 'tornado':
        return 'weather-wind'
      case 'clear':
        return timeOfDay.value === 'night' ? 'weather-stars' : 'weather-sun'
      default:
        return ''
    }
  })

  return {
    currentCondition,
    timeOfDay,
    setWeatherCondition,
    backgroundGradient,
    weatherAnimation
  }
}
