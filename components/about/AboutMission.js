export default function AboutMission() {
  return (
    <section className="py-32 lg:py-48 bg-[#F6F6F6]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Column 1: Anchor */}
          <div className="lg:col-span-4">
            <span className="text-[10px] tracking-[0.4em] text-[#8B3A4F] font-bold uppercase block mb-6">
              / 01 — Misión
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 font-display leading-tight">
              Nuestra <br /> Misión
            </h2>
          </div>

          {/* Column 2: Statement */}
          <div className="lg:col-span-8">
            <div className="bg-white p-10 lg:p-16 rounded-sm shadow-sm border border-slate-100">
              <p className="text-slate-600 leading-relaxed text-xl md:text-2xl font-body">
                Creemos que el estilo no debería ser complicado. Cada día, millones de personas 
                se enfrentan a la misma pregunta:{" "}
                <span className="text-[#8B3A4F] italic font-medium">"¿Qué me pongo?"</span>
              </p>
              <div className="h-px w-20 bg-[#8B3A4F]/30 my-10" />
              <p className="text-slate-900 leading-relaxed text-xl md:text-2xl font-medium font-display italic">
                ATTIRA existe para eliminar esa fricción — usando IA para transformar 
                la incertidumbre en decisiones seguras y con estilo.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}