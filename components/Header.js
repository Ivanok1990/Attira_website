import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 rounded-2xl px-8 flex items-center justify-between transition-all duration-300">
        
        {/* Logo */}
        <Link href="/" className="relative w-36 h-10">
          <Image 
            src="/images/attira_logo_off.webp" 
            alt="ATTIRA" 
            fill
            className="object-contain"
          />
        </Link>

        {/* Enlaces */}
        <div className="flex items-center gap-8 text-base font-medium">
          <Link 
            href="/" 
            className="text-slate-600 hover:text-[#8B3A4F] transition-colors"
          >
            Inicio
          </Link>
          <Link 
            href="/about" 
            className="text-slate-600 hover:text-[#8B3A4F] transition-colors"
          >
            About
          </Link>
          <Link 
            href="/blog" 
            className="text-slate-600 hover:text-[#8B3A4F] transition-colors"
          >
            Blog
          </Link>
          <Link 
            href="/contact" 
            className="text-slate-600 hover:text-[#8B3A4F] transition-colors"
          >
            Contacto
          </Link>
        </div>

      </nav>
    </header>
  )
}