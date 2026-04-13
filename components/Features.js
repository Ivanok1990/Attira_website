export default function Features() {
  const features = [
    {
      title: "IA personalizada",
      desc: "Outfits basados en tu estilo y tu ropa",
    },
    {
      title: "Decisiones rápidas",
      desc: "Menos tiempo pensando, más tiempo viviendo",
    },
    {
      title: "Aprende contigo",
      desc: "La IA mejora mientras la usas",
    },
    {
      title: "Todo en un lugar",
      desc: "Guardarropa, outfits e inspiración",
    },
  ];

  return (
    <section className="bg-[#F6F6F6] text-white py-24 border-t border-[#1F2937]">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Todo lo que necesitas para decidir mejor
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-[#E7DDDC] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#8B3A4F]">
                {f.title}
              </h3>
              <p className="mt-2 text-[#131416]">{f.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}