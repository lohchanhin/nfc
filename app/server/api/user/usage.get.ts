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
  if (!user) {
    setResponseStatus(event, 404)
    return {}
  }

  const plan = user.subscriptionStatus === 'active' ? 'pro' : 'basic'
  const quota = plan === 'pro' ? 1000 : 100
  let expiration: number | null = null

  if (user.subscriptionId && plan === 'pro') {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2023-08-16'
    })
    try {
      const sub = await stripe.subscriptions.retrieve(user.subscriptionId)
      expiration = sub.current_period_end
    } catch {
      expiration = null
    }
  }

  return {
    plan,
    quota,
    expiration
  }
})
