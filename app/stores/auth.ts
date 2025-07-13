import { defineStore } from 'pinia'

interface Tokens {
  accessToken: string | null
  refreshToken: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): Tokens => ({
    accessToken: null,
    refreshToken: null
  }),
  actions: {
    load() {
      if (process.client) {
        this.accessToken = sessionStorage.getItem('accessToken')
        this.refreshToken = sessionStorage.getItem('refreshToken')
      }
    },
    setTokens(access: string, refresh: string) {
      this.accessToken = access
      this.refreshToken = refresh
      if (process.client) {
        sessionStorage.setItem('accessToken', access)
        sessionStorage.setItem('refreshToken', refresh)
      }
    },
    clear() {
      this.accessToken = null
      this.refreshToken = null
      if (process.client) {
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('refreshToken')
      }
    }
  }
})
