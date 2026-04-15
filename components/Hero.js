"use client";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#F6F6F6] text-white overflow-hidden pt-28">
      {/* Resto del contenido se mantiene igual */}
      <div className="absolute right-0 top-0 w-125 h-125 bg-[#653F3C] opacity-40 blur-3xl rounded-full"></div>
      <div className="absolute right-20 top-40 w-75 h-75#60A5FA] opacity-10 blur-2xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <p className="text-sm tracking-widest text-[#8B3A4F] uppercase mb-4">
          Tu asistente de moda con IA
        </p>

        <h1 className="text-5xl text-[#131416] md:text-7xl font-bold leading-tight max-w-3xl">
          Decide qué ponerte{" "}
          <span className="text-[#8B3A4F]">
            Sin pensarlo demasiado
          </span>
        </h1>

        <p className="mt-6 text-lg text-[#131416] max-w-xl">
          ATTIRA usa inteligencia artificial para crear outfits personalizados 
          basados en tu estilo, tu ropa y tu contexto.
        </p>

        <div className="mt-8 flex items-center gap-6">
          <button className="bg-[#8B3A4F] text-white px-6 py-3 rounded-full font-medium hover:bg-[#7e4e4b] transition">
            Empieza gratis
          </button>

          <button className="text-[#131416] hover:text-[#8B3A4F] transition">
            Ver Más ↓
          </button>
        </div>
      </div>
    </section>
  );
}