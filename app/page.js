import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution"; 
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
  
export default function Home() {
  return (
    <div>
        <Hero />
        <Problem />
         <Solution /> 
         <HowItWorks />
         <Features />
         <CTA />
    </div>
  )
}