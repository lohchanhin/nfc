import { useApi } from './useApi'

interface PortalSessionRes {
  url: string
}

export function useBilling() {
  const api = useApi()

  const openPortal = async () => {
    const { url } = await api<PortalSessionRes>('/billing/portal-session', {
      method: 'POST'
    })

    if (process.client) {
      window.location.href = url
    }
  }

  return { openPortal }
}
