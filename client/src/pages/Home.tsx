import { Hero } from "@/components/Hero";
import { Statistics } from "@/components/Statistics";
import { WeatherForecast } from "@/components/WeatherForecast";
import { MarketPrices } from "@/components/MarketPrices";
import { CropRecommendations } from "@/components/CropRecommendations";
import { Features } from "@/components/Features";
import { ChatDemo } from "@/components/ChatDemo";
import { AIModels } from "@/components/AIModels";
import { UseCases } from "@/components/UseCases";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Statistics />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24 space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-24">
        <WeatherForecast />
        <MarketPrices />
        <CropRecommendations />
      </div>
      <Features />
      <ChatDemo />
      <AIModels />
      <UseCases />
      <FinalCTA />
    </div>
  );
}
