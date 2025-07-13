import { useAuthStore } from '../stores/auth'

function base64Url(input: ArrayBuffer) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function randomString(length: number) {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (d) => ('0' + (d & 0xff).toString(16)).slice(-2)).join('')
}

export function useAuth() {
  const store = useAuthStore()
  const config = useRuntimeConfig()

  const login = async () => {
    if (!process.client) return
    const state = randomString(16)
    const verifier = randomString(32)
    sessionStorage.setItem('pkce_state', state)
    sessionStorage.setItem('pkce_verifier', verifier)
    const challenge = base64Url(
      await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))
    )
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: config.public.AUTH_CLIENT_ID,
      redirect_uri: config.public.AUTH_REDIRECT_URI,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      state
    })
    window.location.href = `${config.public.AUTH_AUTHORIZE_URL}?${params.toString()}`
  }

  const handleCallback = async () => {
    if (!process.client) return
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const storedState = sessionStorage.getItem('pkce_state')
    const verifier = sessionStorage.getItem('pkce_verifier')
    if (!code || !state || !verifier || state !== storedState) return

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.public.AUTH_REDIRECT_URI,
      client_id: config.public.AUTH_CLIENT_ID,
      code_verifier: verifier
    })

    const tokens = await $fetch<any>(config.public.AUTH_TOKEN_URL, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    store.setTokens(tokens.access_token, tokens.refresh_token)
    sessionStorage.removeItem('pkce_state')
    sessionStorage.removeItem('pkce_verifier')
  }

  const logout = () => {
    store.clear()
  }

  return { login, handleCallback, logout }
}
