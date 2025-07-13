export default defineEventHandler(async (event) => {
  setCookie(event, 'token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    secure: true,
    sameSite: 'lax'
  })
  return { message: '已登出' }
})
