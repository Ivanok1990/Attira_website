export default function AboutHero() {
  return (
    <section className="relative pt-40 pb-24">
      
      {/* Background */}
      <div className="absolute left-0 top-40 w-96 h-96 bg-[#653F3C]/20 blur-3xl rounded-full" />
      

      <div className="relative max-w-6xl mx-auto px-6 md:px-10">

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#E7DDDC] px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-[#653F3C] tracking-wide">
              Quiénes somos
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight font-display">
            Acerca de  
            <span className="text-[#8B3A4F]"> ATTIRA</span>
          </h1>

          <div className="w-20 h-1 bg-[#8B3A4F] rounded-full mt-6 mb-8" />

          <p className="text-xl text-[#4B5563] leading-relaxed">
            ATTIRA es un asistente de moda impulsado por IA diseñado para ayudar 
            a las personas a decidir qué ponerse y qué comprar — con confianza y claridad.
          </p>
        </div>

      </div>
    </section>
  );
}