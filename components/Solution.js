export default function Solution() {
  return (
    <section className="bg-[#F6F6F6] py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <header className="max-w-3xl mb-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-slate-900">
            ATTIRA decide por ti,
            <br />
            <span className="text-[#8B3A4F] italic">
              pero sigue siendo tu estilo
            </span>
          </h2>

          <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed">
            Analiza tu ropa real, aprende tus preferencias y entiende el contexto
            para generar combinaciones que realmente funcionan.
          </p>
        </header>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT — Visual + Main Idea */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl h-[420px] flex items-center justify-center bg-gradient-to-br from-[#F6F6F6] to-[#EDEDED] mb-10" >
              <img
                src="/"
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>

            <div className="max-w-md">
              <span className="text-xs tracking-[0.3em] text-[#8B3A4F] block mb-4">
                / — Guardarropa
              </span>

              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
                Entiende exactamente lo que tienes
              </h3>

              <p className="text-slate-600 text-lg leading-relaxed">
                ATTIRA analiza prendas, colores y combinaciones para trabajar con tu armario real, no con ideas genéricas.
              </p>
            </div>
          </div>

          {/* RIGHT — Supporting */}
          <div className="lg:col-span-5 space-y-16 pt-8">

            <div className="border-t border-slate-200 pt-6">
              <span className="text-xs tracking-[0.3em] text-[#8B3A4F] block mb-3">
                / — Estilo
              </span>

              <h4 className="text-xl font-semibold text-slate-900 mb-2">
                Aprende cómo te gusta vestirte
              </h4>

              <p className="text-slate-600 leading-relaxed">
                Cada interacción mejora las recomendaciones. Se adapta a ti con el uso.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <span className="text-xs tracking-[0.3em] text-[#8B3A4F] block mb-3">
                / — Contexto
              </span>

              <h4 className="text-xl font-semibold text-slate-900 mb-2">
                Considera el día completo
              </h4>

              <p className="text-slate-600 leading-relaxed">
                Clima, ocasión y nivel de formalidad para que cada outfit tenga sentido.
              </p>
            </div>

          </div>
        </div>

        {/* Outcome */}
        <div className="mt-24 border-t border-slate-200 pt-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          
          <p className="text-sm tracking-[0.3em] uppercase text-slate-400">
            Resultado
          </p>

          <p className="text-xl md:text-3xl font-medium text-[#8B3A4F] italic">
            Outfits listos en menos de 60 segundos
          </p>
        </div>

      </div>
    </section>
  );
}