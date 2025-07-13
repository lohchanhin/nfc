export default defineEventHandler(async (event) => {
  setCookie(event, 'token', '', { httpOnly: true, path: '/', maxAge: 0 })
  return { message: '已登出' }
})
