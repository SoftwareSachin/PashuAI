import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cpu, Zap, Smartphone, ExternalLink } from "lucide-react";

export function AIModels() {
  const models = [
    {
      badge: "PRODUCTION",
      size: "8B",
      name: "Dhenu2 India 8B",
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
      name: "Dhenu2 India 3B",
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
      name: "Dhenu2 India 1B",
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
    <section id="models" className="py-16 md:py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Dhenu AI Models</Badge>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Agricultural Language Models
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Advanced AI models trained on agricultural knowledge covering 4000+ topics with 95% accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {models.map((model) => (
            <Card
              key={model.name}
              className="p-6 hover-elevate bg-background"
              data-testid={model.testId}
            >
              <div className="flex items-start justify-between mb-4">
                <Badge variant="secondary" className="text-xs font-semibold">
                  {model.badge}
                </Badge>
                <model.icon className="h-6 w-6 text-primary" />
              </div>

              <div className="text-4xl font-bold text-foreground mb-2">{model.size}</div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{model.name}</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{model.description}</p>

              <div className="space-y-2 mb-6">
                {model.features.map((feature, idx) => (
                  <div key={feature.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{feature.label}:</span>
                    <span className="font-medium text-foreground" data-testid={`model-feature-${model.size}-${idx}`}>{feature.value}</span>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full" data-testid={`button-view-${model.size}`}>
                View Details
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Dhenu2 Vision", subtitle: "Computer vision for disease detection", status: "Coming Soon", testId: "upcoming-vision" },
            { title: "Dhenu2 CRA", subtitle: "Climate Resilient Agriculture specialist", status: "In Development", testId: "upcoming-cra" },
            { title: "Dhenu2 US", subtitle: "Adapted for US agricultural practices", status: "Planned", testId: "upcoming-us" },
          ].map((upcoming) => (
            <Card key={upcoming.title} className="p-6 bg-muted border-dashed" data-testid={upcoming.testId}>
              <h4 className="font-semibold text-foreground mb-2">{upcoming.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{upcoming.subtitle}</p>
              <Badge variant="outline" data-testid={`badge-${upcoming.testId}`}>{upcoming.status}</Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
