"use client";

import { useState } from "react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "1",
      title: "Define tu estilo",
      description:
        "Cuéntanos qué te gusta y para qué ocasiones te vistes. La IA aprende de tus preferencias con cada toque.",
      image:
        "/images/app_mockups/attira_setup_profile_style_step_mockup.webp",
    },
    {
      number: "2",
      title: "Sube tu ropa",
      description:
        "Toma fotos o sube imágenes de las prendas que tienes en tu armario.",
      image: "/images/app_mockups/attira_wardrobe_mockup.webp",
    },
    {
      number: "3",
      title: "Genera outfits con IA",
      description:
        "Recibe sugerencias diarias basadas en el clima y tu agenda.",
      image: "/images/app_mockups/attira_outfit_generation_result_mockup.webp",
    },
    {
      number: "4",
      title: "Tu armario, organizado",
      description:
        "Visualiza todo lo que tienes y planifica tus looks.",
      image: "/images/app_mockups/attira_wardrobe_organization_mockup.jpeg",
    },
  ];

  const nextStep = () =>
    setActiveStep((prev) => (prev + 1) % steps.length);

  const prevStep = () =>
    setActiveStep((prev) =>
      prev === 0 ? steps.length - 1 : prev - 1
    );

  return (
    <section className="bg-[#F6F6F6] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Phone Preview */}
          <div className="flex flex-col items-center space-y-6">
            
            <div className="relative w-[300px] h-[650px] rounded-[40px] bg-black p-[6px] shadow-2xl">
              <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-white">
                
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-full z-20" />

                {/* Smooth image transition */}
                <div className="relative w-full h-full overflow-hidden">
                  {steps.map((step, index) => (
                    <img
                      key={index}
                      src={step.image}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${
                          activeStep === index
                            ? "opacity-100 translate-x-0 scale-100 z-10"
                            : "opacity-0 translate-x-4 scale-95 z-0"
                        }
                      `}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={prevStep}
                className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
              >
                ←
              </button>

              <button
                onClick={nextStep}
                className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-100 transition cursor-pointer"
              >
                →
              </button>
            </div>
          </div>

          {/* RIGHT: Steps */}
          <div className="space-y-6">
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Cómo funciona <br />
              <span className="text-[#8B3A4F]">ATTIRA</span>
            </h2>

            <p className="text-xl text-slate-600 max-w-md">
              Tu armario digital en 4 pasos simples.
            </p>

            <div className="space-y-4">
              {steps.map((step, i) => (
                <div
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border 
                    ${
                      activeStep === i
                        ? "bg-[#8B3A4F]/5 border-[#8B3A4F]/20"
                        : "bg-white border-transparent hover:border-slate-200"
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                      ${
                        activeStep === i
                          ? "bg-[#8B3A4F] text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {step.number}
                    </div>

                    <div
                      key={activeStep}
                      className="transition-all duration-500 animate-fadeIn"
                    >
                      <h3 className="text-lg font-semibold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-sm mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <p className="inline-flex items-center gap-3 text-base font-semibold text-[#8B3A4F] bg-[#8B3A4F]/5 px-6 py-3 rounded-full border border-[#8B3A4F]/10">
                Listo en menos de 60 segundos
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease;
        }
      `}</style>
    </section>
  );
}