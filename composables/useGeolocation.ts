import { ref } from 'vue'

type Coordinates = { lat: number; lon: number } | null
type ErrorMessage = string | null

export const useGeolocation = () => {
  const coords = ref<Coordinates>(null)
  const loading = ref<boolean>(false)
  const error = ref<ErrorMessage>(null)

  const getCurrentPosition = () => {
    return new Promise<Coordinates>((resolve, reject) => {
      if (!navigator.geolocation) {
        const errorMsg = 'Geolocation is not supported by your browser'
        error.value = errorMsg
        reject(new Error(errorMsg))
        return
      }

      loading.value = true
      error.value = null

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationCoords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
          coords.value = locationCoords
          loading.value = false
          resolve(locationCoords)
        },
        (err) => {
          let errorMsg = 'ไม่สามารถระบุตำแหน่งของคุณได้'
          
          if (err instanceof GeolocationPositionError) {
            switch (err.code) {
              case err.PERMISSION_DENIED:
                errorMsg = 'คุณปฏิเสธการเข้าถึงตำแหน่งของคุณ'
                break
              case err.POSITION_UNAVAILABLE:
                errorMsg = 'ข้อมูลตำแหน่งของคุณไม่พร้อมใช้งาน'
                break
              case err.TIMEOUT:
                errorMsg = 'หมดเวลาในการรับข้อมูลตำแหน่งของคุณ'
                break
            }
          }
          
          error.value = errorMsg
          loading.value = false
          reject(new Error(errorMsg))
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    })
  }

  return {
    coords,
    loading,
    error,
    getCurrentPosition
  }
}
