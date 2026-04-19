import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutVision from "@/components/about/AboutVision";
import AboutWhatWeDo from "@/components/about/AboutWhatWeDo";
import AboutTeam from "@/components/about/AboutTeam";
import AboutOurBlog from "@/components/about/AboutOurBlog";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <div className="bg-[#F6F6F6]">
      <AboutHero />
      <AboutMission />
      <AboutVision />
      <AboutWhatWeDo />
      <AboutTeam />
      <AboutOurBlog />
      <AboutCTA />
    </div>
  );
}