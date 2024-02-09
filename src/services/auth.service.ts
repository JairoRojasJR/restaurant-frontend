import axios from 'axios'
import { authPath } from '@/consts'
import type { AuthStatus, LoginResponse, ResponseMessage } from '@/types/server'

export const authStatus = async (): Promise<AuthStatus> => {
  const url = `${authPath}/status`
  const req = await axios.get(url, { withCredentials: true })
  return (await req.data) as AuthStatus
}

export const login = async (formData: FormData): Promise<LoginResponse> => {
  const urlLogin = `${authPath}/login`
  const req = await axios.post(urlLogin, formData, { withCredentials: true })
  const data = (await req.data) as LoginResponse
  await axios.post('/api/cookie-auth', data, { withCredentials: true })
  return data
}

export const logout = async (): Promise<ResponseMessage> => {
  const urlLogin = `${authPath}/logout`
  const req = await axios.get(urlLogin, { withCredentials: true })
  await axios.delete('/api/cookie-auth', { withCredentials: true })
  return (await req.data) as ResponseMessage
}
