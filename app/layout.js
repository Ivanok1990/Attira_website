import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import HeaderAndFooterWrapper from '@/components/HeaderAndFooterWrapper'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans' 
})

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-display' 
})

export const metadata = {
  title: 'ATTIRA - Tu asistente de moda con IA',
  description: 'Decide qué ponerte sin pensarlo demasiado.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    colorScheme: 'light',
  },
  // ← Aquí está la corrección principal para el favicon
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',        // por si quieres usarlo también en móviles
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="bg-[#F6F6F6]">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#F6F6F6] flex flex-col min-h-screen antialiased`}>
        <HeaderAndFooterWrapper>{children}</HeaderAndFooterWrapper>
      </body>
    </html>
  )
}