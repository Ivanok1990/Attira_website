export default function AboutPage() {
  return (
    <main className="bg-[#F6F6F6] text-[#8B3A4F] min-h-screen px-6 py-24">
      
      <div className="max-w-5xl mx-auto">

        {/* 🧠 Intro */}
        <h1 className="text-5xl font-bold">
          About ATTIRA
        </h1>

        <p className="mt-6 text-lg text-[#9CA3AF] max-w-2xl">
          ATTIRA is an AI-powered fashion decision platform designed to help people 
          decide what to wear and what to buy — with confidence and clarity.
        </p>

        {/* 🎯 Mission */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-[#8B3A4F]">
            Our Mission
          </h2>

          <p className="mt-4 text-[#9CA3AF] max-w-3xl">
            We believe style should not be complicated. Every day, millions of people 
            struggle with the same question: “What should I wear?”
            <br /><br />
            ATTIRA exists to remove that friction — using AI to transform uncertainty 
            into confident decisions.
          </p>
        </div>

        {/* 🚀 What we do */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-[#8B3A4F]">
            What We Do
          </h2>

          <div className="mt-6 grid md:grid-cols-3 gap-6">
            
            <div className="bg-[#E7DDDC] p-6 rounded-xl">
              <h3 className="font-semibold text-[#8B3A4F]">AI Styling</h3>
              <p className="mt-2 text-[#9CA3AF] text-sm">
                Generate outfits based on your wardrobe and preferences.
              </p>
            </div>

            <div className="bg-[#E7DDDC] p-6 rounded-xl">
              <h3 className="font-semibold text-[#8B3A4F]">Personalization</h3>
              <p className="mt-2 text-[#9CA3AF] text-sm">
                Learn from your behavior to improve recommendations over time.
              </p>
            </div>

            <div className="bg-[#E7DDDC] p-6 rounded-xl">
              <h3 className="font-semibold text-[#8B3A4F]">Decision Engine</h3>
              <p className="mt-2 text-[#9CA3AF] text-sm">
                Help you decide faster, smarter, and with confidence.
              </p>
            </div>

          </div>
        </div>

        {/* 🌎 Vision */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-[#8B3A4F]">
            Our Vision
          </h2>

          <p className="mt-4 text-[#9CA3AF] max-w-3xl">
            Starting in Central America and expanding globally, we aim to redefine 
            how people interact with fashion — making it more intelligent, accessible, 
            and deeply personal.
          </p>
        </div>

      </div>
    </main>
  );
}