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
    <section className="py-8 sm:py-10 md:py-12 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4 sm:p-5 md:p-6 text-center hover-elevate" data-testid={stat.testId}>
              <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary mx-auto mb-2 sm:mb-3" />
              <div className="text-2xl sm:text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
