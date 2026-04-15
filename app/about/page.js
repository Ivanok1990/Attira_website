import Image from 'next/image';

export default function AboutPage() {
  const team = [
    {
      name: "Ainhoa Ramos",
      role: "CEO & Product Manager",
      description: "La visión detrás de ATTIRA",
      image: "/images/team/ainhoa-ramos.jpg",
      alt: "Ainhoa Ramos - CEO de ATTIRA"
    },
    {
      name: "Patrick Solis",
      role: "Chief Technology Officer",
      description: "La mente detrás de la ingeniería de ATTIRA",
      image: "/images/team/patrick-solis.jpg",
      alt: "Patrick Solis - CTO de ATTIRA"
    },
    {
      name: "Faviana Richters",
      role: "Chief Marketing Officer",
      description: "La estrategia detrás de ATTIRA",
      image: "/images/team/faviana-richters.png",
      alt: "Faviana Richters - CMO de ATTIRA"
    },
    {
      name: "Edlin González",
      role: "UI/UX Designer & Product Support",
      description: "Donde ATTIRA cobra vida",
      image: "/images/team/edlin-gonzalez.jpg",
      alt: "Edlin González - UI/UX Designer de ATTIRA"
    },
    {
      name: "Roberto Espinoza",
      role: "Finance & Operations Manager",
      description: "La estructura financiera detrás de ATTIRA",
      image: "/images/team/roberto-espinoza.jpg",
      alt: "Roberto Espinoza - Finance Manager de ATTIRA"
    },
    {
      name: "Luis Saravia",
      role: "Full Stack Developer",
      description: "Construyendo la plataforma de ATTIRA",
      image: "/images/team/luis-saravia.jpg",
      alt: "Luis Saravia - Full Stack Developer de ATTIRA"
    },
    {
      name: "Omar Quintanilla",
      role: "Software Developer",
      description: "Construyendo la experiencia ATTIRA",
      image: "/images/team/omar-quintanilla.jpg",
      alt: "Omar Quintanilla - Software Developer de ATTIRA"
    }
  ];

  return (
    <section className="relative bg-[#F6F6F6] text-[#8B3A4F] min-h-screen overflow-hidden pt-36">
      
      {/* Elementos decorativos */}
      <div className="absolute left-0 top-40 w-96 h-96 bg-[#653F3C] opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute right-0 bottom-20 w-80 h-80 bg-[#8B3A4F] opacity-10 blur-3xl rounded-full"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        
        {/* Intro */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-[#E7DDDC] px-4 py-2 rounded-full mb-6">
            <span className="text-2xl">✨</span>
            <span className="text-sm font-medium text-[#653F3C] tracking-wide">Quiénes somos</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            About ATTIRA
          </h1>
          <div className="w-20 h-1 bg-[#8B3A4F] rounded-full mt-6 mb-8"></div>
          <p className="text-xl text-[#4B5563] max-w-3xl leading-relaxed">
            ATTIRA es un asistente de moda impulsado por IA diseñado para ayudar a las personas 
            a decidir qué ponerse y qué comprar — con confianza y claridad.
          </p>
        </div>

        {/* Misión */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🎯</span>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Nuestra Misión
            </h2>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-[#E7DDDC]">
            <p className="text-[#4B5563] leading-relaxed text-lg">
              Creemos que el estilo no debería ser complicado. Cada día, millones de personas 
              se enfrentan a la misma pregunta: <span className="text-[#8B3A4F] font-medium">"¿Qué me pongo?"</span>
              <br /><br />
              ATTIRA existe para eliminar esa fricción — usando IA para transformar la incertidumbre 
              en decisiones seguras y con estilo.
            </p>
          </div>
        </div>

        {/* Lo que hacemos */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🚀</span>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Lo que hacemos
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group bg-white rounded-2xl p-8 border border-[#E7DDDC] hover:shadow-xl hover:shadow-[#8B3A4F]/5 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#8B3A4F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#8B3A4F]/20 transition">
                <span className="text-2xl">👔</span>
              </div>
              <h3 className="text-xl font-semibold text-[#8B3A4F] mb-2">Estilismo con IA</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Genera outfits personalizados basados en tu armario, preferencias y el contexto del día.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 border border-[#E7DDDC] hover:shadow-xl hover:shadow-[#8B3A4F]/5 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#8B3A4F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#8B3A4F]/20 transition">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-[#8B3A4F] mb-2">Personalización</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Aprende de tu comportamiento para mejorar las recomendaciones con el tiempo.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 border border-[#E7DDDC] hover:shadow-xl hover:shadow-[#8B3A4F]/5 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#8B3A4F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#8B3A4F]/20 transition">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-[#8B3A4F] mb-2">Decisión Rápida</h3>
              <p className="text-[#6B7280] leading-relaxed">
                Te ayuda a decidir más rápido, más inteligente y con total confianza.
              </p>
            </div>
          </div>
        </div>

        {/* EQUIPO CON FOTOS */}
        <div className="mt-28">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#E7DDDC] px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">👥</span>
              <span className="text-sm font-medium text-[#653F3C] tracking-wide">CONOCE LAS MENTES DETRÁS DE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#8B3A4F]">
              ATTIRA
            </h2>
            <p className="mt-4 text-[#6B7280] max-w-2xl mx-auto">
              Un equipo apasionado trabajando para revolucionar la forma en que te vistes
            </p>
            <div className="w-16 h-0.5 bg-[#8B3A4F]/30 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-3xl overflow-hidden border border-[#E7DDDC] hover:shadow-2xl hover:shadow-[#8B3A4F]/10 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Contenedor de la foto */}
                <div className="relative h-64 bg-gradient-to-br from-[#F6F1EE] to-[#E7DDDC] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Overlay elegante al hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8B3A4F]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Información */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#8B3A4F] group-hover:text-[#653F3C] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-[#9CA3AF] mt-1 uppercase tracking-wide">
                    {member.role}
                  </p>
                  <div className="w-12 h-px bg-[#E7DDDC] mx-auto my-4"></div>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visión */}
        <div className="mt-28">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🌎</span>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Nuestra Visión
            </h2>
          </div>
          <div className="bg-gradient-to-r from-[#8B3A4F]/5 to-transparent rounded-2xl p-8 border-l-4 border-[#8B3A4F]">
            <p className="text-[#4B5563] leading-relaxed text-lg">
              Comenzando en Centroamérica y expandiéndonos globalmente, aspiramos a redefinir 
              la forma en que las personas interactúan con la moda — haciéndola más inteligente, 
              accesible y profundamente personal.
            </p>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-[#9CA3AF]">¿Listo para transformar tu forma de vestir?</p>
            <button className="bg-[#8B3A4F] hover:bg-[#653F3C] text-white px-8 py-3 rounded-full font-medium transition-all active:scale-[0.98] shadow-lg shadow-[#8B3A4F]/20">
              Empieza tu prueba gratis →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}