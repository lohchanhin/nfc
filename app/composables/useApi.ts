import axios from 'axios'
import { useAuthStore } from '../stores/auth'

export function useApi() {
  const config = useRuntimeConfig()
  const instance = axios.create({
    baseURL: config.public?.API_BASE_URL || ''
  })

  instance.interceptors.request.use((request) => {
    const store = useAuthStore()
    if (store.accessToken) {
      request.headers = request.headers || {}
      ;(request.headers as any).Authorization = `Bearer ${store.accessToken}`
    }
    return request
  })

  return instance
}
