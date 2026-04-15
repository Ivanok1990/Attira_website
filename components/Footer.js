export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-white pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid md:grid-cols-3 gap-10 border-b border-gray-700 pb-12">
          
          {/* Columna 1 - Marca */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold tracking-tight">ATTIRA</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Tu asistente de moda con IA que te ayuda a vestir mejor 
              todos los días, sin esfuerzo.
            </p>
          </div>

          {/* Columna 2 - Enlaces */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-white">Navegación</h3>
            <div className="space-y-3 text-gray-400">
              <p><a href="/" className="hover:text-white transition-colors">Inicio</a></p>
              <p><a href="/blog" className="hover:text-white transition-colors">Blog</a></p>
              <p><a href="/about" className="hover:text-white transition-colors">Sobre ATTIRA</a></p>
              <p><a href="/contact" className="hover:text-white transition-colors">Contacto</a></p>
            </div>
          </div>

          {/* Columna 3 - Contacto y Redes */}
          <div>
            <h3 className="font-semibold text-lg mb-5 text-white">Conéctate</h3>
            
            <div className="text-gray-400 space-y-2 mb-8">
              <p>hello@attira.com</p>
            </div>

            {/* Instagram */}
            <div>
              <p className="text-sm text-gray-400 mb-3">Síguenos en Instagram</p>
              <a 
                href="https://www.instagram.com/attira.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
              >
                <div className="w-9 h-9 bg-[#8B3A4F]/20 rounded-2xl flex items-center justify-center group-hover:bg-[#8B3A4F] transition-colors">
                  📸
                </div>
                <div>
                  <p className="font-medium">@attira.app</p>
                  <p className="text-xs text-gray-500">Instagram</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm mt-10">
          © 2026 ATTIRA. Todos los derechos reservados.
        </div>

      </div>
    </footer>
  )
}