export default defineNuxtRouteMiddleware(async () => {
  const { data } = await useFetch('/api/user', {
    headers: useRequestHeaders(['cookie'])
  })
  if (!data.value || !(data.value as any).id) {
    return navigateTo('/login')
  }
})
