import { useAuthStore } from '../stores/auth'

export const useApi = () => {
  const cfg = useRuntimeConfig()

  return async <T>(url: string, opts: FetchOptions = {}) => {
    const store = useAuthStore()
    const headers = new Headers(opts.headers || {})
    if (store.accessToken) {
      headers.set('Authorization', `Bearer ${store.accessToken}`)
    }

    return $fetch<T>(url, {
      baseURL: cfg.public.apiBase ?? '/api',
      ...opts,
      headers
    })
  }
}
