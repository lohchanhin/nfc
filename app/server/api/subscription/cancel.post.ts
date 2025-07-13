import { prisma } from '#utils/prisma'
import { verifyToken } from '#utils/auth'
import { createError } from 'h3'
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const userId = verifyToken(event)
  if (!userId) {
    setResponseStatus(event, 401)
    return {}
  }
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || !user.subscriptionId) {
    throw createError({ statusCode: 404, statusMessage: '無訂閱紀錄' })
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-08-16' })
  await stripe.subscriptions.del(user.subscriptionId)
  await prisma.user.update({
    where: { id: user.id },
    data: { subscriptionId: null, subscriptionStatus: 'canceled' }
  })
  return { status: 'canceled' }
})
