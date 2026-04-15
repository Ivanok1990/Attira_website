export default function Solution() {
  return (
    <section className="bg-[#F6F6F6] py-24 ">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#131416] leading-tight">
            ATTIRA toma decisiones por ti,<br />
            <span className="text-[#8B3A4F]">exactamente a tu estilo</span>
          </h2>
          
          <p className="mt-6 text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            Olvídate de pasar minutos (o horas) frente al armario. 
            ATTIRA analiza tu ropa real, tu estilo personal y el contexto del día 
            para generar outfits perfectos en segundos.
          </p>
        </div>

        {/* Contenido visual con cards */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-[#8B3A4F]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#8B3A4F] transition-colors">
              <span className="text-3xl">👕</span>
            </div>
            <h3 className="text-2xl font-semibold text-[#131416] mb-3">
              Analiza tu guardarropa real
            </h3>
            <p className="text-[#4B5563]">
              Subes fotos de tu ropa y ATTIRA entiende qué tienes, colores, estilos y cómo combinarlo todo.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-[#8B3A4F]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#8B3A4F] transition-colors">
              <span className="text-3xl">👤</span>
            </div>
            <h3 className="text-2xl font-semibold text-[#131416] mb-3">
              Conoce tu estilo personal
            </h3>
            <p className="text-[#4B5563]">
              Aprende de tus gustos, ocasiones favoritas y feedback para generar sugerencias cada vez más precisas.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 bg-[#8B3A4F]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#8B3A4F] transition-colors">
              <span className="text-3xl">📍</span>
            </div>
            <h3 className="text-2xl font-semibold text-[#131416] mb-3">
              Adapta al contexto del día
            </h3>
            <p className="text-[#4B5563]">
              Clima, ocasión (trabajo, cita, viaje), nivel de formalidad… ATTIRA lo tiene todo en cuenta.
            </p>
          </div>

        </div>

        {/* Frase final de refuerzo */}
        <div className="text-center mt-16">
          <p className="text-[#8B3A4F] font-medium text-lg">
            Resultado: outfits que realmente quieres usar, en menos de 60 segundos.
          </p>
        </div>

      </div>
    </section>
  );
}