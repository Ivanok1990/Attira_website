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
      desc: "Cuanto más la uses, más inteligente se vuelve. Recuerda qué te gusta, qué no, y se adapta a tu vida.",
    },
    {
      icon: "📱",
      title: "Todo en un solo lugar",
      desc: "Tu guardarropa digital + recomendaciones diarias + inspiración ilimitada.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-[#131416] leading-tight">
            La forma inteligente<br />de vestir cada día
          </h2>
          <p className="mt-6 text-xl text-[#555] max-w-2xl mx-auto">
            No es solo otra app de moda. Es tu asistente personal que elimina la frustración de decidir qué ponerte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group bg-[#F8F5F4] hover:bg-white border border-transparent hover:border-[#E7DDDC] p-10 rounded-3xl transition-all duration-300 hover:shadow-xl"
            >
              <div className="text-5xl mb-6 transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              
              <h3 className="text-2xl font-semibold text-[#131416] mb-4">
                {feature.title}
              </h3>
              
              <p className="text-[#555] leading-relaxed text-[17px]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}