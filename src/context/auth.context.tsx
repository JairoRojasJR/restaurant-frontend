'use client'

import { createContext, useContext } from 'react'
import { useAuth, type UseAuth } from '@/hooks/auth.hook'

const AuthContext = createContext<UseAuth>({
  authenticated: false,
  login: async () => {},
  logout: async () => {}
})

export function AuthContextProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  const state = useAuth()
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export function useAuthContext(): UseAuth {
  return useContext(AuthContext)
}
