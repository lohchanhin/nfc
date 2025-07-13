import jwt from 'jsonwebtoken'
import { H3Event } from 'h3'

export function verifyToken(event: H3Event): number | null {
  const token = getCookie(event, 'token')
  if (!token) return null
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number }
    return decoded.id
  } catch {
    return null
  }
}
