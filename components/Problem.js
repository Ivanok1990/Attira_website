export default function Problem() {
  return (
    <section className="bg-[#F6F6F6] text-[#8B3A4F] py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold">
          Decidir qué ponerte no debería ser difícil
        </h2>

        <p className="mt-6 text-[#9CA3AF]">
          La mayoría de las personas solo usa el 20% de su guardarropa.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-6 text-left">
          {[
            "Nunca sabes qué ponerte",
            "Usas siempre lo mismo",
            "Compras ropa que no aprovechas",
            "Pierdes tiempo decidiendo",
          ].map((item, i) => (
            <div key={i} className="bg-[#E7DDDC] p-6 rounded-xl">
              <p className="text-[#131416]">{item}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}