import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Maritime PMS',
  description: 'Vessel Planned Maintenance System + Noon Reporting',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
