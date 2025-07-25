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
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: '帳號不存在' })
  }


  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16'
  })
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'myr',
          product_data: { name: 'NFC 評論板組 月租' },
          unit_amount: 1990,
          recurring: { interval: 'month' }
        },
        quantity: 1
      },
      {
        price_data: {
          currency: 'myr',
          product_data: { name: 'NFC 評論板組 建置費' },
          unit_amount: 19900
        },
        quantity: 1
      }
    ],
    customer: user.stripeCustomerId || undefined,
    success_url: `${getRequestURL(event).origin}/dashboard`,
    cancel_url: `${getRequestURL(event).origin}/`
  })

  if (session.subscription) {
    await prisma.user.update({
      where: { id: user.id },
      data: { subscriptionId: session.subscription as string }
    })
  }

  return { url: session.url }
})
