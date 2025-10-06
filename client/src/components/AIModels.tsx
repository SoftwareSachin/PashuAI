import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu, Zap, Smartphone, ExternalLink } from "lucide-react";

export function AIModels() {
  const models = [
    {
      badge: "PRODUCTION",
      size: "8B",
      name: "Pashu AI India 8B",
      description: "Most powerful model for comprehensive advisory applications supporting farmers and agri-businesses",
      features: [
        { label: "Based on", value: "Llama 3.1" },
        { label: "Accuracy", value: "95%" },
        { label: "Coverage", value: "4000+ Topics" },
      ],
      icon: Cpu,
      testId: "model-8b",
    },
    {
      badge: "BALANCED",
      size: "3B",
      name: "Pashu AI India 3B",
      description: "Balanced performance for conversational applications requiring knowledge and responsiveness",
      features: [
        { label: "Based on", value: "Llama 3.2" },
        { label: "Speed", value: "Optimized" },
        { label: "Latency", value: "Lower" },
      ],
      icon: Zap,
      testId: "model-3b",
    },
    {
      badge: "MOBILE",
      size: "1B",
      name: "Pashu AI India 1B",
      description: "Lightweight model for on-device deployment on smartphones and resource-constrained devices",
      features: [
        { label: "Based on", value: "Llama 3.2" },
        { label: "Deploy", value: "On-Device" },
        { label: "Support", value: "Offline" },
      ],
      icon: Smartphone,
      testId: "model-1b",
    },
  ];

  return (
    <section id="models" className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 xs:mb-10 sm:mb-12">
          <Badge variant="outline" className="mb-3 xs:mb-4 text-xs xs:text-sm">Pashu AI Models</Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-3 xs:mb-4 px-2">
            Agricultural Language Models
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Advanced AI models trained on agricultural knowledge covering 4000+ topics with 95% accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 mb-8 xs:mb-10 sm:mb-12">
          {models.map((model) => (
            <Card
              key={model.name}
              className="p-5 xs:p-6 hover-elevate bg-background"
              data-testid={model.testId}
            >
              <div className="flex items-start justify-between mb-3 xs:mb-4">
                <Badge variant="secondary" className="text-[10px] xs:text-xs font-semibold">
                  {model.badge}
                </Badge>
                <model.icon className="h-5 w-5 xs:h-6 xs:w-6 text-primary" />
              </div>

              <div className="text-3xl xs:text-4xl font-bold text-foreground mb-1.5 xs:mb-2">{model.size}</div>
              <h3 className="text-base xs:text-lg font-semibold text-foreground mb-2 xs:mb-3 leading-tight">{model.name}</h3>
              <p className="text-xs xs:text-sm text-muted-foreground mb-5 xs:mb-6 leading-relaxed">{model.description}</p>

              <div className="space-y-1.5 xs:space-y-2 mb-5 xs:mb-6">
                {model.features.map((feature, idx) => (
                  <div key={feature.label} className="flex items-center justify-between text-xs xs:text-sm">
                    <span className="text-muted-foreground">{feature.label}:</span>
                    <span className="font-medium text-foreground" data-testid={`model-feature-${model.size}-${idx}`}>{feature.value}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full text-xs xs:text-sm" data-testid={`button-view-${model.size}`}>
                View Details
                <ExternalLink className="h-3.5 w-3.5 xs:h-4 xs:w-4 ml-2" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
          {[
            { title: "Pashu AI Vision", subtitle: "Computer vision for disease detection", status: "Coming Soon", testId: "upcoming-vision" },
            { title: "Pashu AI CRA", subtitle: "Climate Resilient Agriculture specialist", status: "In Development", testId: "upcoming-cra" },
            { title: "Pashu AI US", subtitle: "Adapted for US agricultural practices", status: "Planned", testId: "upcoming-us" },
          ].map((upcoming) => (
            <Card key={upcoming.title} className="p-5 xs:p-6 bg-muted border-dashed" data-testid={upcoming.testId}>
              <h4 className="text-sm xs:text-base font-semibold text-foreground mb-1.5 xs:mb-2 leading-tight">{upcoming.title}</h4>
              <p className="text-xs xs:text-sm text-muted-foreground mb-2.5 xs:mb-3 leading-relaxed">{upcoming.subtitle}</p>
              <Badge variant="outline" className="text-[10px] xs:text-xs" data-testid={`badge-${upcoming.testId}`}>{upcoming.status}</Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
