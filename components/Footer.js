import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        
        <div className="grid md:grid-cols-3 gap-10 border-b border-slate-800 pb-12">
          
          {/* Columna 1 - Marca */}
          <div>
            <div className="relative w-44 h-12 mb-4">
              <Image 
                src="/images/attira_logo_off.webp" 
                alt="ATTIRA" 
                fill
                className="object-contain"
              />
            </div>
            <p className="text-slate-400 max-w-xs text-base">
              Tu asistente de moda con IA que te ayuda a vestir mejor 
              todos los días, sin esfuerzo.
            </p>
          </div>

          {/* Columna 2 - Enlaces */}
          <div>
            <h3 className="text-xl font-semibold font-display mb-5">Navegación</h3>
            <div className="space-y-3 text-slate-400">
              <p><Link href="/" className="hover:text-white transition-colors">Inicio</Link></p>
              <p><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></p>
              <p><Link href="/about" className="hover:text-white transition-colors">Sobre ATTIRA</Link></p>
              <p><Link href="/contact" className="hover:text-white transition-colors">Contacto</Link></p>
            </div>
          </div>

          {/* Columna 3 - Contacto y Redes */}
          <div>
            <h3 className="text-xl font-semibold font-display mb-5">Conéctate</h3>
            
            <div className="text-slate-400 space-y-2 mb-8">
              <p>hello@attira.com</p>
            </div>

            {/* Instagram */}
            <div>
              <p className="text-sm text-slate-400 mb-3">Síguenos en Instagram</p>
              <a 
                href="https://www.instagram.com/attira.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="w-9 h-9 bg-[#8B3A4F]/20 rounded-xl flex items-center justify-center group-hover:bg-[#8B3A4F] transition-colors">
                  📸
                </div>
                <div>
                  <p className="font-medium">@attira.app</p>
                  <p className="text-xs text-slate-500">Instagram</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-slate-500 text-base mt-10">
          © 2026 ATTIRA. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  )
}