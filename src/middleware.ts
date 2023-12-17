import { NextResponse, type NextRequest } from 'next/server'
import { authPath } from './consts'
import { type AuthStatus } from './types/server'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const sessionCookie = request.cookies.get('sessionId')
  const url = `${authPath}/status?sessionId=${sessionCookie?.value}`

  try {
    const req = await fetch(url)
    const { authenticated } = (await req.json()) as AuthStatus
    if (authenticated) return NextResponse.redirect(new URL('/', request.url))
    else return NextResponse.next()
  } catch (error) {
    return NextResponse.next()
  }
}

export const config = {
  matcher: '/login'
}
