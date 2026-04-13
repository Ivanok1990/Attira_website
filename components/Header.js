import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-[#F6F1EE] shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#8B3A4F]">
            DRESSLY
          </Link>
          <div className="space-x-6">
            <Link href="/" className="text-[#653F3C] hover:text-[#653F3C]">
              Inicio
            </Link>
            <Link href="/blog" className="text-[#653F3C] hover:text-[#653F3C]">
              Blog
            </Link>
            <Link href="/contact" className="text-[#653F3C] hover:text-[#653F3C]">
              Contact
            </Link>
            
             <Link href="/about" className="text-[#653F3C] hover:text-[#653F3C]">
              About
            </Link>

            
          </div>
        </div>
      </nav>
    </header>
  )
}