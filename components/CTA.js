export default function CTA() {
  return (
    <section className="bg-[#F6F6F6] py-28  text-center">
      <div className="max-w-3xl mx-auto px-6">
        
        <h2 className="text-5xl md:text-6xl font-bold text-[#131416] leading-tight">
          ¿Listo para vestir mejor<br />sin esfuerzo?
        </h2>

        <p className="mt-6 text-xl text-[#4B5563] max-w-lg mx-auto">
          Deja de perder tiempo decidiendo qué ponerte. 
          ATTIRA analiza tu ropa y genera outfits perfectos para ti todos los días.
        </p>

        {/* Botón principal */}
        <div className="mt-10">
          <button 
            className="bg-[#8B3A4F] hover:bg-[#653F3C] text-white px-10 py-5 rounded-full 
                       font-semibold text-lg transition-all active:scale-95 shadow-lg hover:shadow-xl"
          >
            Crear cuenta gratis →
          </button>
        </div>

        {/* Texto de confianza */}
        <div className="mt-8 flex flex-col items-center gap-3 text-sm text-[#6B7280]">
          <p className="flex items-center gap-2">
            <span className="text-green-500">✓</span> 
            Sin tarjeta de crédito • Prueba 14 días gratis
          </p>
          <p className="flex items-center gap-2">
            <span className="text-green-500">✓</span> 
            Cancela cuando quieras
          </p>
        </div>

        {/* Trust signals */}
        <div className="mt-12 pt-8 border-t border-[#E7DDDC] flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs text-[#9CA3AF]">
          <div>🔒 Tus datos están seguros</div>
          <div>🌍 Funciona con cualquier guardarropa</div>
          <div>💡 IA entrenada para estilo real</div>
        </div>

      </div>
    </section>
  );
}