import axios from 'axios'
import { cookies } from 'next/headers'
import { type AuthStatus } from '@/types/server'

export const frontendAuthStatus = async (): Promise<AuthStatus> => {
  const sessionId = cookies().get('sessionId')?.value
  const url = `${process.env.NEXT_PUBLIC_FRONTEND}/api/cookie-auth?sessionId=${sessionId}`
  const req = await axios.get(url)
  return (await req.data) as AuthStatus
}
