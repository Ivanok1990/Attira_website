export default function AboutWhatWeDo() {
  const items = [
    {
      number: "01",
      title: "Estilismo con IA",
      desc: "Genera outfits personalizados basados en tu armario real, tus preferencias y el clima local."
    },
    {
      number: "02",
      title: "Personalización",
      desc: "Nuestro motor de aprendizaje evoluciona con cada elección para volverse tu doble digital."
    },
    {
      number: "03",
      title: "Decisión Rápida",
      desc: "Eliminamos la fatiga de decisión para que empieces tu día con total confianza."
    }
  ];

  return (
    <section className="py-32 lg:py-48 bg-[#F6F6F6] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header - Editorial Style */}
        <div className="max-w-3xl mb-24">
          <span className="text-[10px] tracking-[0.4em] text-[#8B3A4F] font-bold uppercase block mb-6">
            / Capabilidades
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 font-display leading-[1.1]">
            Transformamos tu armario <br /> 
            <span className="text-[#8B3A4F] italic font-medium">en una ventaja estratégica.</span>
          </h2>
        </div>

        {/* Services Grid - Minimalist Stack */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
          {items.map((item, i) => (
            <div
              key={i}
              className="group relative pt-12 border-t border-slate-200 hover:border-slate-900 transition-colors duration-500"
            >
              {/* Numeric Indicator - Inspired by Scale AI */}
              <span className="absolute top-4 left-0 text-[10px] font-bold text-[#8B3A4F] tracking-widest uppercase">
                {item.number} — Service
              </span>

              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display tracking-tight transition-transform group-hover:translate-x-2">
                {item.title}
              </h3>

              <p className="text-slate-500 text-lg leading-relaxed font-body">
                {item.desc}
              </p>

              {/* Subtle Decorative Element */}
              <div className="mt-8 w-8 h-[2px] bg-[#8B3A4F]/0 group-hover:bg-[#8B3A4F] transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}