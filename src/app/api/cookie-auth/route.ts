import { type NextRequest } from 'next/server'
import { serialize } from 'cookie'
import { type LoginResponse } from '@/types/server'

export async function POST(req: NextRequest): Promise<Response> {
  const { session } = (await req.json()) as LoginResponse

  const cookieOptions = {
    ...session.cookie,
    expires: new Date(session.cookie.expires)
  }

  const cookie = serialize('sessionId', session.id, cookieOptions)

  return new Response(JSON.stringify({ message: 'Cookie creada' }), {
    status: 200,
    headers: { 'Set-Cookie': cookie }
  })
}

export async function DELETE(req: NextRequest): Promise<Response> {
  const cookieOptions = {
    expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT'),
    path: '/'
  }

  const cookie = serialize('sessionId', 'deleted', cookieOptions)

  return new Response(JSON.stringify({ message: 'Cookie eliminada' }), {
    status: 200,
    headers: { 'Set-Cookie': cookie }
  })
}
