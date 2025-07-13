import { useApi } from './useApi'

interface PortalSessionRes {
  url: string
}

export function useBilling() {
  const api = useApi()

  const openPortal = async () => {
    const { data } = await api.post<PortalSessionRes>('/api/billing/portal-session')
    if (process.client && data.url) {
      window.location.href = data.url
    }
  }

  return { openPortal }
}
