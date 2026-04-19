export default function AboutVision() {
  return (
    <section className="py-32 lg:py-48 bg-[#F6F6F6] border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Column 1: Anchor */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <span className="text-[10px] tracking-[0.4em] text-[#8B3A4F] font-bold uppercase block mb-6">
              / 02 — Visión
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 font-display leading-tight">
              Nuestra <br /> Visión
            </h2>
          </div>

          {/* Column 2: Statement */}
          <div className="lg:col-span-8 pt-4 lg:pt-0">
            <p className="text-slate-600 leading-relaxed text-2xl md:text-4xl font-display font-medium tracking-tight">
              Comenzando en Centroamérica y expandiéndonos globalmente, aspiramos 
              a redefinir la forma en que las personas interactúan con la moda — 
              haciéndola <span className="text-slate-900 underline decoration-[#8B3A4F]/20">más inteligente</span>, accesible y profundamente personal.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}