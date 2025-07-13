import { prisma } from '#utils/prisma'
import { H3Error, createError } from 'h3'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body
  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: '資料不足' })
  }

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) {
    throw createError({ statusCode: 409, statusMessage: '帳號已存在' })
  }

  const hashed = await bcrypt.hash(password, 10)
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2023-08-16' })
  const customer = await stripe.customers.create({ email })
  const user = await prisma.user.create({
    data: { email, password: hashed, stripeCustomerId: customer.id }
  })

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)
  setCookie(event, 'token', token, {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'lax'
  })
  return { id: user.id, email: user.email }
})
