"use client";

import { useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Overlay cuando el menú está abierto */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
        <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 rounded-2xl px-4 md:px-8 flex items-center justify-between transition-all duration-300">
          
          {/* Logo - MÁS GRANDE */}
          <Link href="/" className="relative w-36 md:w-44 h-12 md:h-14">
            <Image 
              src="/images/logo.webp" 
              alt="ATTIRA" 
              fill
              className="object-contain"
            />
          </Link>

          {/* Enlaces Desktop */}
          <div className="hidden md:flex items-center gap-8 text-base font-medium">
            <Link href="/" className="text-slate-600 hover:text-[#8B3A4F] transition-colors">
              Inicio
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-[#8B3A4F] transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-slate-600 hover:text-[#8B3A4F] transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-[#8B3A4F] transition-colors">
              Contacto
            </Link>
          </div>

          {/* Botón Hamburguesa (solo mobile) */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-600" />
            ) : (
              <Menu className="w-6 h-6 text-slate-600" />
            )}
          </button>

          {/* Menú Móvil */}
          <div className={`md:hidden fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-xl transition-all duration-300 z-50 ${
            isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
          }`}>
            <div className="flex flex-col p-6 gap-4">
              <Link 
                href="/" 
                className="text-slate-700 hover:text-[#8B3A4F] transition-colors text-lg font-medium py-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/about" 
                className="text-slate-700 hover:text-[#8B3A4F] transition-colors text-lg font-medium py-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/blog" 
                className="text-slate-700 hover:text-[#8B3A4F] transition-colors text-lg font-medium py-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className="text-slate-700 hover:text-[#8B3A4F] transition-colors text-lg font-medium py-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}