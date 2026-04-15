import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ATTIRA - Tu asistente de moda con IA',
  description: 'Decide qué ponerte sin pensarlo demasiado.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'light',   // ← Esto ayuda mucho
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="bg-[#F6F6F6] ">
      <body className={`${inter.className} bg-[#F6F6F6] flex flex-col min-h-screen antialiased`}>
        <Header />
        <main className="grow">
  {children}
</main>
        <Footer />
      </body>
    </html>
  )
}