import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Sprout } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 sm:mb-6" data-testid="badge-farmers">
            <Sprout className="h-3 w-3 mr-1.5" />
            Trusted by 100K+ Farmers
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
            AI-Powered Agricultural Intelligence
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Empowering farmers with multilingual AI advisory for crop management, livestock care, disease detection, and real-time market insights. Available in 20+ Indian languages.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            <Link href="/chat">
              <Button size="lg" variant="default" className="w-full sm:w-auto min-w-[200px]" data-testid="button-hero-launch">
                Launch Copilot
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px]" data-testid="button-watch-demo">
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto px-4">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1" data-testid="stat-topics">
                4000+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Topics Covered</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1" data-testid="stat-accuracy">
                95%
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1" data-testid="stat-languages">
                20+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">Languages</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
