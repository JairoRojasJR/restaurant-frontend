import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Restaurante-SF',
  description: 'Sitio web oficial del Restaurante-SF'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='es'>
      <body>{children}</body>
    </html>
  )
}
