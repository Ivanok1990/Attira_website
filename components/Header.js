import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="bg-[#F6F1EE]/95 backdrop-blur-2xl shadow-xl shadow-[#8B3A4F]/10 
                      border border-[#E7DDDC] rounded-3xl 
                      px-10 py-5 transition-all duration-300">
        
        <div className="flex justify-between items-center min-w-[640px]">
          
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold text-[#8B3A4F] tracking-tighter">
            ATTIRA
          </Link>

          {/* Enlaces */}
          <div className="flex items-center gap-9 text-sm font-medium">
            <Link 
              href="/" 
              className="text-[#653F3C] hover:text-[#8B3A4F] transition-colors"
            >
              Inicio
            </Link>
            <Link 
              href="/blog" 
              className="text-[#653F3C] hover:text-[#8B3A4F] transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className="text-[#653F3C] hover:text-[#8B3A4F] transition-colors"
            >
              Contacto
            </Link>
            <Link 
              href="/about" 
              className="text-[#653F3C] hover:text-[#8B3A4F] transition-colors"
            >
              About
            </Link>
          </div>

        </div>
      </nav>
    </header>
  )
}