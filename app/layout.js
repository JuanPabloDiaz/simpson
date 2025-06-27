import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Simpsons',
  description: 'Full stack app to display characters from The Simpsons',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js" strategy="afterInteractive" />
      </head>
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
