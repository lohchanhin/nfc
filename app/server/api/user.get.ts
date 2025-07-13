import { prisma } from '#utils/prisma'
import { verifyToken } from '#utils/auth'

export default defineEventHandler(async (event) => {
  const userId = verifyToken(event)
  if (!userId) {
    setResponseStatus(event, 401)
    return { }
  }
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    setResponseStatus(event, 404)
    return {}
  }
  return {
    id: user.id,
    email: user.email,
    subscriptionStatus: user.subscriptionStatus
  }
})
