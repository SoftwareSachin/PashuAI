import { Card } from "@/components/ui/card";
import { Users, MessageSquare, BookOpen, Target } from "lucide-react";

export function Statistics() {
  const stats = [
    {
      icon: Users,
      value: "100K+",
      label: "Active Farmers",
      testId: "stat-active-farmers",
    },
    {
      icon: MessageSquare,
      value: "1.5M+",
      label: "Conversations",
      testId: "stat-conversations",
    },
    {
      icon: BookOpen,
      value: "4000+",
      label: "Topics Covered",
      testId: "stat-topics-covered",
    },
    {
      icon: Target,
      value: "95%",
      label: "Accuracy Rate",
      testId: "stat-accuracy-rate",
    },
  ];

  return (
    <section className="py-12 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 text-center hover-elevate" data-testid={stat.testId}>
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
