
export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#F6F6F6] overflow-hidden pt-32 md:pt-40 lg:pt-48">
      {/* Refined Background Elements - Softer Blurs */}
      <div className="absolute right-[-10%] top-[-10%] w-[500px] h-[500px] bg-[#8B3A4F]/5 blur-[120px] rounded-full" />
      <div className="absolute left-[-5%] bottom-[10%] w-[300px] h-[300px] bg-[#60A5FA]/5 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="flex flex-col items-start">
            <span className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-[#8B3A4F] mb-6">
              Tu asistente de moda con IA
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-[-0.03em] text-slate-900 leading-[1.1] font-display">
              Decide qué ponerte <br />
              <span className="text-[#8B3A4F] italic decoration-1">
                Sin pensarlo demasiado
              </span>
            </h1>

            <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg font-body">
              ATTIRA utiliza inteligencia artificial para crear outfits personalizados 
              basados en tu estilo, tu armario y tu día a día.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
               <a 
                  href="https://app.attiraai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#8B3A4F] text-white min-h-[56px] px-10 rounded-2xl font-semibold shadow-lg shadow-[#8B3A4F]/20 hover:translate-y-[-2px] transition-all duration-300 active:scale-95 flex items-center justify-center whitespace-nowrap">
                    Empieza gratis
  </a>

              
             

              <button className="group flex items-center gap-2 text-slate-900 font-semibold py-3 px-4 transition-colors">
                Ver más
                <span className="group-hover:translate-y-1 transition-transform duration-300">↓</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Mockup (Phone Style) */}
          <div className="relative flex justify-center lg:justify-center order-first lg:order-last">
            {/* Phone Wrapper - Phone size with hover animation */}
            <div className="relative w-[320px] h-[600px] rounded-[40px] bg-black p-[6px] shadow-2xl 
                transform rotate-[6deg] hover:rotate-0 hover:scale-105 
                transition-all duration-700 ease-out">
              
              {/* Screen */}
              <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-white">
                
                {/* Notch / Dynamic Island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-full z-20" />

                {/* App Screenshot */}
                <img 
                  src="/images/app_mockups/attira_feed_mockup.webp"
                  alt="Attira App Interface"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[#8B3A4F]/10 blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}