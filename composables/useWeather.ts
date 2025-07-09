import { ref } from 'vue'

export const useWeather = () => {
  const weather = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchWeatherByCity = async (city: string, apiKey: string) => {
    if (!city.trim()) return
    
    try {
      loading.value = true
      error.value = null
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}&lang=th`)
      // console.log(res)
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('ไม่พบข้อมูลเมืองที่คุณค้นหา')
        } else {
          throw new Error('เกิดข้อผิดพลาดในการโหลดข้อมูลสภาพอากาศ')
        }
      }
      
      const data = await res.json()
      weather.value = data
      return data
    } catch (err: any) {
      console.error('Error fetching weather by city:', err)
      error.value = err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูลสภาพอากาศ'
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchWeatherByCoords = async (lat: number, lon: number, apiKey: string) => {
    try {
      loading.value = true
      error.value = null
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=th`)
      // console.log(res)
      
      if (!res.ok) {
        throw new Error('ไม่สามารถโหลดข้อมูลจากตำแหน่งปัจจุบันได้')
      }
      
      const data = await res.json()
      weather.value = data
      return data
    } catch (err: any) {
      console.error('Error fetching weather by coords:', err)
      error.value = err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูลสภาพอากาศ'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    weather,
    error,
    loading,
    fetchWeatherByCity,
    fetchWeatherByCoords
  }
}
