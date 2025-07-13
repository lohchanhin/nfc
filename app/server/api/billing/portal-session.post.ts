import Stripe from 'stripe'
import { prisma } from '#utils/prisma'
import { verifyToken } from '#utils/auth'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const userId = verifyToken(event)
  if (!userId) {
    setResponseStatus(event, 401)
    return {}
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || !user.stripeCustomerId) {
    throw createError({ statusCode: 404, statusMessage: '無客戶資料' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16'
  })

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${getRequestURL(event).origin}/dashboard`
  })

  return { url: session.url }
})
