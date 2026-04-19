export default function Problem() {
  const problems = [
    {
      title: "Nunca sabes qué ponerte",
      desc: "Abres el armario y... bloqueo total. Todo te parece 'meh' aunque esté lleno.",
    },
    {
      title: "Siempre usas lo mismo",
      desc: "Las mismas 3 prendas una y otra vez. Tu ropa favorita se queda olvidada.",
    },
    {
      title: "Compras por impulso",
      desc: "Prendas que terminan en arrepentimiento y dinero desperdiciado.",
    },
    {
      title: "Batallas contra el tiempo",
      desc: "Cada mañana se convierte en una pequeña pérdida de minutos decidiendo.",
    },
  ];

  return (
    <section className="bg-[#F6F6F6] py-28 lg:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[#8B3A4F] text-sm font-bold tracking-[0.25em] uppercase mb-6 block">
            El problema
          </span>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
            Decidir qué ponerte <br />
            <span className="text-[#8B3A4F]">
              no debería ser un drama diario
            </span>
          </h2>

          <p className="mt-10 text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            La mayoría solo usa el{" "}
            <span className="text-slate-900 font-semibold underline decoration-[#8B3A4F]/30">
              20% de su guardarropa
            </span>. El resto queda olvidado.
          </p>
        </div>

        {/* Problems Layout */}
        <div className="grid md:grid-cols-2 gap-10">
          {problems.map((item, i) => (
            <div
              key={i}
              className={`group transition-all duration-500 `}
            >
              <div className="p-8 md:p-10 bg-white/70 backdrop-blur-sm rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                
                {/* Number */}
                <span className="text-xs tracking-[0.3em] text-[#8B3A4F] mb-6 block">
                  / 0{i + 1}
                </span>

                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">
                  {item.title}
                </h3>
                
                <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-md">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-20">
          <p className="text-slate-400 italic flex items-center justify-center gap-3">
            Suena familiar
            <span className="w-10 h-px bg-slate-200"></span>
          </p>
        </div>

      </div>
    </section>
  );
}