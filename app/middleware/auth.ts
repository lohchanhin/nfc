export default defineNuxtRouteMiddleware(async () => {
  const { data } = await useFetch('/api/user')
  if (!data.value || !(data.value as any).id) {
    return navigateTo('/login')
  }
})
