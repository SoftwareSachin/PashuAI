import { Card } from "@/components/ui/card";
import { Sprout, Beef, Camera, Mic, TrendingUp, BookOpen } from "lucide-react";
import cropManagementImg from "@assets/stock_images/crop_management_farm_772aeffb.jpg";
import livestockImg from "@assets/stock_images/livestock_cattle_far_8421b9a7.jpg";
import imageAnalysisImg from "@assets/stock_images/crop_management_farm_772f2f37.jpg";
import voiceInputImg from "@assets/stock_images/livestock_cattle_far_091da66a.jpg";
import marketImg from "@assets/stock_images/agricultural_market__6d633c2c.jpg";
import knowledgeImg from "@assets/stock_images/agricultural_market__1b49f8dd.jpg";

export function Features() {
  const features = [
    {
      icon: Sprout,
      title: "Crop Management",
      description: "Get personalized advice on planting, irrigation, fertilization, and harvesting for optimal yields.",
      tags: ["Pest Control", "Weather", "Soil Health"],
      testId: "feature-crop",
      image: cropManagementImg,
    },
    {
      icon: Beef,
      title: "Livestock Advisory",
      description: "Expert guidance for cattle, buffalo, goats - covering health, breeding, nutrition, and disease prevention.",
      tags: ["Health", "Breeding", "Nutrition"],
      testId: "feature-livestock",
      image: livestockImg,
    },
    {
      icon: Camera,
      title: "Image Analysis",
      description: "Upload photos for instant AI-powered disease detection and health assessment of crops and livestock.",
      tags: ["Disease ID", "AI Vision", "Real-time"],
      testId: "feature-image",
      image: imageAnalysisImg,
    },
    {
      icon: Mic,
      title: "Voice Input",
      description: "Hands-free interaction with voice-to-text in multiple languages for easy field use.",
      tags: ["20+ Languages", "Hands-free"],
      testId: "feature-voice",
      image: voiceInputImg,
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Real-time market prices, demand forecasts, and selling strategies to maximize profits.",
      tags: ["Prices", "Trends", "Forecast"],
      testId: "feature-market",
      image: marketImg,
    },
    {
      icon: BookOpen,
      title: "Knowledge Base",
      description: "Access 4000+ comprehensive topics covering agriculture, livestock, and sustainable practices.",
      tags: ["4000+ Topics", "Expert Tips"],
      testId: "feature-knowledge",
      image: knowledgeImg,
    },
  ];

  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-3 sm:mb-4 px-2 sm:px-4">
            Comprehensive Agricultural Solutions
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            From crop management to livestock care, access expert AI guidance in your language
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group overflow-hidden hover-elevate bg-background transition-all duration-300"
              data-testid={feature.testId}
            >
              <div className="relative h-40 xs:h-44 sm:h-48 md:h-52 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                  <div className="bg-primary/90 backdrop-blur-sm p-2 sm:p-2.5 rounded-lg">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 xs:p-5 sm:p-6">
                <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-xs xs:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, idx) => (
                    <span
                      key={tag}
                      className="text-[10px] xs:text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md border border-border"
                      data-testid={`tag-${feature.testId}-${idx}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
