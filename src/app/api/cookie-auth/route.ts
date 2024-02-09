import { type NextRequest } from 'next/server'
import { serialize } from 'cookie'
import { getErrorMessage } from '@/utils'
import { authPath } from '@/consts'
import type { AuthStatus, LoginResponse } from '@/types/server'

export async function GET(req: NextRequest): Promise<Response> {
  const sessionId = req.nextUrl.searchParams.get('sessionId')
  const url = `${authPath}/status?sessionId=${sessionId}`

  try {
    const req = await fetch(url)
    const authStatus = (await req.json()) as AuthStatus
    return new Response(JSON.stringify(authStatus), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), { status: 400 })
  }
}

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
  const sessionCookie = req.cookies.get('sessionId')
  if (sessionCookie === undefined) {
    return new Response(JSON.stringify({ message: 'No hay sesión frontend registrada' }))
  }
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
