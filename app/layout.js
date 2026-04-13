import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DRESSLY - Landing Page',
  description: 'Landing page con blog integrado',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}