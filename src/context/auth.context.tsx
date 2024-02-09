'use client'

import { createContext, useContext } from 'react'
import { useAuth, type UseAuth } from '@/hooks/auth.hook'
import { type AuthStatus } from '@/types/server'

interface IAuthContextProvider {
  children: React.ReactNode
  authenticated: AuthStatus['authenticated']
}

const AuthContext = createContext<UseAuth>({
  authenticated: false,
  login: async () => {},
  logout: async () => {}
})

export function AuthContextProvider({
  children,
  authenticated
}: IAuthContextProvider): React.ReactNode {
  const state = useAuth(authenticated)
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export function useAuthContext(): UseAuth {
  return useContext(AuthContext)
}
