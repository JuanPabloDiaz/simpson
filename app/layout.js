import './globals.css'
import { Inter } from 'next/font/google'
import { Navigation, Footer } from '@/components'
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
      <body className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500`}>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />  
      </body>
    </html>
  )
}
