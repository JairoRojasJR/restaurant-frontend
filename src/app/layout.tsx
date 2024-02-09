import '@/globalVars'
import './globals.css'
import { type Metadata } from 'next'
import { Toaster } from 'sonner'
import { AuthContextProvider } from '@/context/auth.context'
import { frontendAuthStatus } from '@/services/server.service'

export const metadata: Metadata = {
  title: 'Restaurante-SF',
  description: 'Sitio web oficial del Restaurante-SF'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  const { authenticated } = await frontendAuthStatus()

  return (
    <html lang='es'>
      <body>
        <AuthContextProvider authenticated={authenticated}>{children}</AuthContextProvider>
        <Toaster />
      </body>
    </html>
  )
}
