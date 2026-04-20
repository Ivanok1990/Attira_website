export default function CTA() {
  return (
    <section className="bg-[#F6F6F6] py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative Glow - Inspired by Scale.com */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8B3A4F]/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Eyebrow Label */}
        <span className="text-[#8B3A4F] font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
          Comienza hoy
        </span>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.1] font-display">
          Tu mejor versión,<br />
          <span className="text-[#8B3A4F]">sin esfuerzo diario.</span>
        </h2>

        <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto font-body">
          Únete a los usuarios que ya han recuperado su tiempo. ATTIRA genera el outfit perfecto basado en tu armario real.
        </p>

        {/* Primary CTA Area */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <a 
  href="https://app.attiraai.com/" 
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex h-14 px-10 items-center justify-center bg-[#8B3A4F] text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(139,58,79,0.3)] hover:shadow-[0_0_50px_rgba(139,58,79,0.5)]"
>
  Descargar App Gratis →
</a>
          
          {/* Micro-Trust Info */}
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <span>Prueba 14 días gratis</span>
            <span className="w-1 h-1 bg-slate-700 rounded-full" />
            <span>Cancela cuando quieras</span>
          </div>
        </div>

        {/* Footer Trust Signals - Refined Grid */}
        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-bold uppercase tracking-widest text-slate-700">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#8B3A4F]">SHIELD</span>
            DATOS PROTEGIDOS
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#8B3A4F]">GLOBAL</span>
            CUALQUIER ARMARIO
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#8B3A4F]">SMART</span>
            IA ENTRENADA
          </div>
        </div>

      </div>
    </section>
  );
}