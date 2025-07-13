import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
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
