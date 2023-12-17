import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { status, login as runLogin, logout as runLogout } from '@/services/auth.service'
import { getErrorMessage, toastErrorWhenSendingData } from '@/utils'
import { type Login } from '@/types/server'
import type { MouseAsync, SubmitAsync } from '@/types/local'

export interface UseAuth {
  authenticated: boolean
  login: SubmitAsync
  logout: MouseAsync
}

type ElementsLogin = {
  [T in keyof Login]: string
}

export const useAuth = (): UseAuth => {
  const [authenticated, setAuthenticated] = useState<UseAuth['authenticated']>(false)
  const router = useRouter()

  const login: UseAuth['login'] = async e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const res = await runLogin(formData)
      toast(res.message)
      setAuthenticated(true)
      router.push('/')
    } catch (error) {
      const elements: ElementsLogin = { username: 'Nombre de usuario', password: 'Contraseña' }
      toastErrorWhenSendingData(error, elements)
    }
  }

  const logout: UseAuth['logout'] = async e => {
    e.preventDefault()

    try {
      const res = await runLogout()
      toast(res.message)
      setAuthenticated(false)
    } catch (error) {
      toast(getErrorMessage(error))
    }
  }

  useEffect(() => {
    status()
      .then(data => {
        setAuthenticated(data.authenticated)
      })
      .catch(e => toast(getErrorMessage(e)))
  }, [])

  return { authenticated, login, logout }
}
