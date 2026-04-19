import Image from "next/image";

  const team = [
    {
      name: "Ainhoa Ramos",
      role: "CEO & Product Manager",
      description: "La visión detrás de ATTIRA",
      image: "/images/team/ainhoa_attira_team.webp",
      alt: "Ainhoa Ramos"
    },
    {
      name: "Patrick Solis",
      role: "Chief Technology Officer",
      description: "La mente detrás de la ingeniería de ATTIRA",
      image: "/images/team/patrick_attira_team.webp",
      alt: "Patrick Solis"
    },
    {
      name: "Faviana Richters",
      role: "Chief Marketing Officer",
      description: "La estrategia detrás de ATTIRA",
      image: "/images/team/faviana_attira_team.webp",
      alt: "Faviana Richters"
    },
    {
      name: "Edlin González",
      role: "UI/UX Designer & Product Support",
      description: "Donde ATTIRA cobra vida",
      image: "/images/team/edlin_attira_team.webp",
      alt: "Edlin González"
    },
    {
      name: "Roberto Espinoza",
      role: "Finance & Operations Manager",
      description: "La estructura financiera detrás de ATTIRA",
      image: "/images/team/roberto_attira_team.webp",
      alt: "Roberto Espinoza"
    },
    {
      name: "Luis Saravia",
      role: "Full Stack Developer",
      description: "Construyendo la plataforma de ATTIRA",
      image: "/images/team/luis_attira_team.webp",
      alt: "Luis Saravia"
    },
    {
      name: "Omar Quintanilla",
      role: "Software Developer",
      description: "Construyendo la experiencia ATTIRA",
      image: "/images/team/omar_attira_team.webp",
      alt: "Omar Quintanilla"
    }
  ];

export default function AboutTeam() {

  return (
    <section className="py-32 bg-[#F6F6F6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-[10px] tracking-[0.4em] text-[#8B3A4F] font-bold uppercase block mb-6">
            / Las mentes
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 font-display leading-[1.1]">
            El equipo construyendo <br /> 
            <span className="text-[#8B3A4F] italic font-medium">el futuro del estilo.</span>
          </h2>
        </div>

        {/* Minimalist Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {team.map((member, index) => (
            <div
              key={index}
              className="group flex flex-col"
            >
              {/* Image Treatment - Inspired by Whering */}
              <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-slate-50 mb-8 shadow-sm">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
              </div>

              {/* Text Area - Left Aligned Editorial */}
              <div className="flex flex-col items-start">
                <span className="text-[10px] tracking-[0.3em] text-[#8B3A4F] font-bold uppercase mb-3">
                  {member.role}
                </span>
                
                <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight mb-3 transition-colors group-hover:text-[#8B3A4F]">
                  {member.name}
                </h3>

                <p className="text-slate-500 text-base leading-relaxed max-w-[280px]">
                  {member.description}
                </p>
                
                {/* Decorative hover line */}
                <div className="mt-6 w-0 group-hover:w-12 h-px bg-[#8B3A4F] transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}