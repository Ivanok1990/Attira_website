export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Sube tu ropa",
      description: "Toma fotos o sube imágenes de las prendas que tienes en tu armario. ATTIRA las analiza automáticamente.",
    },
    {
      number: "02",
      title: "Define tu estilo",
      description: "Dinos qué tipo de looks te gustan, tus colores favoritos y para qué ocasiones sueles vestirte.",
    },
    {
      number: "03",
      title: "Genera outfits con IA",
      description: "En segundos, la inteligencia artificial crea combinaciones perfectas adaptadas a tu guardarropa real y al contexto del día.",
    },
    {
      number: "04",
      title: "Guarda y reutiliza",
      description: "Guarda tus outfits favoritos, crea colecciones y vuelve a usarlos cuando quieras con un solo clic.",
    },
  ];

  return (
    <section className="bg-[#F6F6F6] py-24 ">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#131416]">
            Cómo funciona ATTIRA
          </h2>
          <p className="mt-4 text-[#9CA3AF] text-lg max-w-xl mx-auto">
            Solo 4 pasos simples para que nunca más te quedes frente al armario sin saber qué ponerte.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Línea conectora (solo en desktop) */}
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+28px)] w-full h-0.5 bg-[#E7DDDC] z-0"></div>
              )}

              <div className="relative z-10 bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                
                {/* Número */}
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#8B3A4F] text-white font-bold text-2xl mb-6 group-hover:scale-110 transition-transform">
                  {step.number}
                </div>

                {/* Título */}
                <h3 className="text-xl font-semibold text-[#131416] mb-3">
                  {step.title}
                </h3>

                {/* Descripción */}
                <p className="text-[#4B5563] leading-relaxed text-[15px] flex-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje final */}
        <div className="text-center mt-16">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-[#8B3A4F] bg-[#F6F6F6] px-6 py-3 rounded-full border border-[#E7DDDC]">
            <span className="text-lg">✨</span>
            Listo en menos de 60 segundos
          </p>
        </div>

      </div>
    </section>
  );
}