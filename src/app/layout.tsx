import '@/globalVars'
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { AuthContextProvider } from '@/context/auth.context'

export const metadata: Metadata = {
  title: 'Restaurante-SF',
  description: 'Sitio web oficial del Restaurante-SF'
}

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang='es'>
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
        <Toaster />
      </body>
    </html>
  )
}
