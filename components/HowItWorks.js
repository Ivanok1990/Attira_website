export default function HowItWorks() {
  const steps = [
    "Sube tu ropa",
    "Define tu estilo",
    "Genera outfits con IA",
    "Guarda y reutiliza",
  ];

  return (
    <section className="bg-[#F6F6F6] text-[#8B3A4F] py-24">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Cómo funciona
        </h2>

        <div className="mt-12 grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-[#8B3A4F] text-black font-bold">
                {i + 1}
              </div>
              <p className="mt-4 text-[#9CA3AF]">{step}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}