import { Card } from "@/components/ui/card";
import { Users, Building2, Beef, Landmark } from "lucide-react";

export function UseCases() {
  const cases = [
    {
      icon: Users,
      title: "For Farmers",
      description: "Get personalized guidance in your language with voice support, image analysis, and offline mode for remote areas",
      features: ["Voice Support", "Offline Mode", "Free Access"],
      testId: "usecase-farmers",
    },
    {
      icon: Building2,
      title: "For Enterprises",
      description: "Deploy AI-powered features across sales, support, and operations with comprehensive integrations",
      features: ["Sales Copilot", "API Access", "Custom Models"],
      testId: "usecase-enterprises",
    },
    {
      icon: Beef,
      title: "For Livestock",
      description: "Specialized advisory for cattle, buffalo, goats covering health monitoring, breeding, and disease management",
      features: ["Health Tracking", "Disease Alert", "Nutrition Plans"],
      testId: "usecase-livestock",
    },
    {
      icon: Landmark,
      title: "For Government",
      description: "Support extension services and farmer education programs with AI-powered knowledge dissemination",
      features: ["Extension Services", "Policy Support", "Mass Reach"],
      testId: "usecase-government",
    },
  ];

  return (
    <section id="use-cases" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Transforming Agriculture Across Use Cases
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From farmers to enterprises, our AI platform serves diverse agricultural needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((useCase) => (
            <Card
              key={useCase.title}
              className="p-8 hover-elevate"
              data-testid={useCase.testId}
            >
              <useCase.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-3">{useCase.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{useCase.description}</p>
              <div className="flex flex-wrap gap-2">
                {useCase.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-sm px-3 py-1 bg-muted text-foreground rounded-md border border-border font-medium"
                  >
                    {feature}
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
