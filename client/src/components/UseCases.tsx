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
    <section id="use-cases" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-3 sm:mb-4 px-2">
            Transforming Agriculture Across Use Cases
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            From farmers to enterprises, our AI platform serves diverse agricultural needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {cases.map((useCase) => (
            <Card
              key={useCase.title}
              className="group overflow-hidden hover-elevate transition-all duration-300"
              data-testid={useCase.testId}
            >
              <div className="relative h-48 xs:h-52 sm:h-56 md:h-60 overflow-hidden">
                <img 
                  src={useCase.image} 
                  alt={useCase.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4">
                  <div className="bg-primary/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg mb-2 sm:mb-3 inline-block">
                    <useCase.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-white">{useCase.title}</h3>
                </div>
              </div>
              
              <div className="p-5 xs:p-6 sm:p-7 md:p-8">
                <p className="text-xs xs:text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 md:mb-6 leading-relaxed">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.features.map((feature, idx) => (
                    <span
                      key={feature}
                      className="text-xs xs:text-sm px-2.5 xs:px-3 py-1 bg-muted text-foreground rounded-md border border-border font-medium"
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
