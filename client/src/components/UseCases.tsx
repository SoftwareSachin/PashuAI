import { Card } from "@/components/ui/card";
import { Users, Building2, Beef, Landmark } from "lucide-react";
import farmersImg from "@assets/stock_images/small_farmer_rural_a_51859a62.jpg";
import enterprisesImg from "@assets/stock_images/large_commercial_far_bf5160c5.jpg";
import livestockImg from "@assets/stock_images/livestock_cattle_far_8421b9a7.jpg";
import governmentImg from "@assets/stock_images/agricultural_coopera_c6e88d73.jpg";

export function UseCases() {
  const cases = [
    {
      icon: Users,
      title: "For Farmers",
      description: "Get personalized guidance in your language with voice support, image analysis, and offline mode for remote areas",
      features: ["Voice Support", "Offline Mode", "Free Access"],
      testId: "usecase-farmers",
      image: farmersImg,
    },
    {
      icon: Building2,
      title: "For Enterprises",
      description: "Deploy AI-powered features across sales, support, and operations with comprehensive integrations",
      features: ["Sales Copilot", "API Access", "Custom Models"],
      testId: "usecase-enterprises",
      image: enterprisesImg,
    },
    {
      icon: Beef,
      title: "For Livestock",
      description: "Specialized advisory for cattle, buffalo, goats covering health monitoring, breeding, and disease management",
      features: ["Health Tracking", "Disease Alert", "Nutrition Plans"],
      testId: "usecase-livestock",
      image: livestockImg,
    },
    {
      icon: Landmark,
      title: "For Government",
      description: "Support extension services and farmer education programs with AI-powered knowledge dissemination",
      features: ["Extension Services", "Policy Support", "Mass Reach"],
      testId: "usecase-government",
      image: governmentImg,
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
              className="group overflow-hidden hover-elevate transition-all duration-300"
              data-testid={useCase.testId}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={useCase.image} 
                  alt={useCase.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="bg-primary/90 backdrop-blur-sm p-3 rounded-lg mb-3">
                    <useCase.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{useCase.title}</h3>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-muted-foreground mb-6 leading-relaxed">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.features.map((feature, idx) => (
                    <span
                      key={feature}
                      className="text-sm px-3 py-1 bg-muted text-foreground rounded-md border border-border font-medium"
                      data-testid={`feature-${useCase.testId}-${idx}`}
                    >
                      {feature}
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
