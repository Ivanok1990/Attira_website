import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            DRESSLY
          </Link>
          <div className="space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Inicio
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600">
              Blog
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}