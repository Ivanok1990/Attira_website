export default function Problem() {
  return (
    <section className="bg-[#F6F6F6] text-[#8B3A4F] py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-5xl md:text-6xl font-bold leading-tight">
          Decidir qué ponerte <span className="text-[#131416]">no debería ser un drama diario</span>
        </h2>

        <p className="mt-8 text-xl text-[#9CA3AF] max-w-2xl mx-auto">
          La mayoría de las personas solo usa el <span className="font-semibold text-[#131416]">20% de su guardarropa</span>. 
          El resto se queda ahí, acumulando polvo y culpa.
        </p>

        <div className="mt-16 grid md:grid-cols-2 gap-8 text-left">
          {[
            {
              title: "Nunca sabes qué ponerte",
              desc: "Abres el armario y... bloqueo total. Todo te parece “meh”."
            },
            {
              title: "Siempre terminas usando lo mismo",
              desc: "Las mismas 3 prendas una y otra vez, aunque tengas el clóset lleno."
            },
            {
              title: "Compras ropa que casi no usas",
              desc: "Impulsos que terminan en arrepentimiento y dinero desperdiciado."
            },
            {
              title: "Pierdes minutos (o horas) decidiendo",
              desc: "Cada mañana se convierte en una pequeña batalla contra el tiempo."
            },
          ].map((item, i) => (
            <div 
              key={i} 
              className="bg-[#E7DDDC] p-8 rounded-2xl border border-[#D1B9B4] hover:border-[#8B3A4F]/30 transition-all group"
            >
              <div className="text-4xl mb-4 text-[#8B3A4F]/30 group-hover:text-[#8B3A4F]/50 transition-colors">0{i+1}</div>
              <h3 className="text-[#131416] font-semibold text-xl mb-3">{item.title}</h3>
              <p className="text-[#555] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-lg text-[#8B3A4F]/80 font-medium">
          Suena familiar, ¿verdad?
        </p>

      </div>
    </section>
  );
}