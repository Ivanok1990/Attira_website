export default function Features() {
  const features = [
    {
      icon: "✨",
      title: "IA que realmente te conoce",
      desc: "Analiza tu guardarropa real, tu estilo personal y tus preferencias para recomendarte outfits que sí usarías.",
    },
    {
      icon: "⚡",
      title: "Decisiones en segundos",
      desc: "Olvídate de perder 15 minutos frente al armario. Obtén outfits perfectos al instante.",
    },
    {
      icon: "🧠",
      title: "Aprende y mejora contigo",
      desc: "Cuanto más la usas, más inteligente se vuelve. Recuerda qué te gusta, qué no, y se adapta a tu vida.",
    },
    {
      icon: "📱",
      title: "Todo en un solo lugar",
      desc: "Tu guardarropa digital + recomendaciones diarias + inspiración ilimitada.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10">

        <div className="text-center mb-16 space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-[-0.01em] font-display">
            La forma inteligente<br />de vestir cada día
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            No es solo otra app de moda. Es tu asistente personal que elimina la frustración de decidir qué ponerte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl mb-6">
                {feature.icon}
              </div>
              
              <h3 className="text-xl md:text-2xl font-semibold font-display">
                {feature.title}
              </h3>
              
              <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}