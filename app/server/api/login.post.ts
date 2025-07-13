import { prisma } from '#utils/prisma'
import { createError } from 'h3'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body
  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: '資料不足' })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: '帳號不存在' })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: '密碼錯誤' })
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string)
  setCookie(event, 'token', token, {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'lax'
  })
  return { id: user.id, email: user.email }
})
