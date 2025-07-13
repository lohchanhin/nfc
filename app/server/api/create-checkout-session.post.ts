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
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'myr',
          product_data: { name: 'NFC 評論板組' },
          unit_amount: 19900
        },
        quantity: 1
      }
    ],
    success_url: `${getRequestURL(event).origin}/dashboard`,
    cancel_url: `${getRequestURL(event).origin}/`
  })

  return { url: session.url }
})
