import { prisma } from '#utils/prisma'
import { verifyToken } from '#utils/auth'
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const userId = verifyToken(event)
  if (!userId) {
    setResponseStatus(event, 401)
    return {}
  }
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || !user.subscriptionId) {
    return { status: user?.subscriptionStatus || null }
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16'
  })
  const subscription = await stripe.subscriptions.retrieve(user.subscriptionId)
  await prisma.user.update({
    where: { id: user.id },
    data: { subscriptionStatus: subscription.status }
  })
  return {
    status: subscription.status,
    currentPeriodEnd: subscription.current_period_end
  }
})
