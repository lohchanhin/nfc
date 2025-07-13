import Stripe from 'stripe'
import { prisma } from '#utils/prisma'

export const config = {
  bodyParser: false
}

export default defineEventHandler(async (event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16'
  })
  const rawBody = await readRawBody(event)
  const signature = getHeader(event, 'stripe-signature') || ''
  const { stripeWebhookSecret } = useRuntimeConfig()
  let stripeEvent: Stripe.Event
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody!.toString(),
      signature,
      stripeWebhookSecret as string
    )
  } catch {
    setResponseStatus(event, 400)
    return { error: 'Invalid signature' }
  }

  if (
    stripeEvent.type === 'checkout.session.completed' ||
    stripeEvent.type === 'invoice.paid'
  ) {
    let customerId: string | null = null
    let subscriptionId: string | null = null
    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session
      customerId = session.customer as string
      subscriptionId = session.subscription as string | null
    } else {
      const invoice = stripeEvent.data.object as Stripe.Invoice
      customerId = invoice.customer as string
      subscriptionId =
        typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id || null
    }
    if (customerId && subscriptionId) {
      await prisma.user.updateMany({
        where: { stripeCustomerId: customerId },
        data: { subscriptionId, subscriptionStatus: 'active' }
      })
    }
  }

  return { received: true }
})
