import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })

export const metadata = {
  title: 'ATTIRA - Tu asistente de moda con IA',
  description: 'Decide qué ponerte sin pensarlo demasiado.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'light',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="bg-[#F6F6F6]">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#F6F6F6] flex flex-col min-h-screen antialiased`}>
        <Header />
        <main className="grow">
  {children}
</main>
        <Footer />
      </body>
    </html>
  )
}