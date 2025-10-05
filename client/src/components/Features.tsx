import { Card } from "@/components/ui/card";
import { Sprout, Beef, Camera, Mic, TrendingUp, BookOpen } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Sprout,
      title: "Crop Management",
      description: "Get personalized advice on planting, irrigation, fertilization, and harvesting for optimal yields.",
      tags: ["Pest Control", "Weather", "Soil Health"],
      testId: "feature-crop",
    },
    {
      icon: Beef,
      title: "Livestock Advisory",
      description: "Expert guidance for cattle, buffalo, goats - covering health, breeding, nutrition, and disease prevention.",
      tags: ["Health", "Breeding", "Nutrition"],
      testId: "feature-livestock",
    },
    {
      icon: Camera,
      title: "Image Analysis",
      description: "Upload photos for instant AI-powered disease detection and health assessment of crops and livestock.",
      tags: ["Disease ID", "AI Vision", "Real-time"],
      testId: "feature-image",
    },
    {
      icon: Mic,
      title: "Voice Input",
      description: "Hands-free interaction with voice-to-text in multiple languages for easy field use.",
      tags: ["20+ Languages", "Hands-free"],
      testId: "feature-voice",
    },
    {
      icon: TrendingUp,
      title: "Market Intelligence",
      description: "Real-time market prices, demand forecasts, and selling strategies to maximize profits.",
      tags: ["Prices", "Trends", "Forecast"],
      testId: "feature-market",
    },
    {
      icon: BookOpen,
      title: "Knowledge Base",
      description: "Access 4000+ comprehensive topics covering agriculture, livestock, and sustainable practices.",
      tags: ["4000+ Topics", "Expert Tips"],
      testId: "feature-knowledge",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Comprehensive Agricultural Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From crop management to livestock care, access expert AI guidance in your language
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 hover-elevate bg-background"
              data-testid={feature.testId}
            >
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
              <div className="flex flex-wrap gap-2">
                {feature.tags.map((tag, idx) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md border border-border"
                    data-testid={`tag-${feature.testId}-${idx}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
