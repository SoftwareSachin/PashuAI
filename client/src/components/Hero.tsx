import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Sprout } from "lucide-react";
import heroBackground from "@assets/stock_images/modern_agriculture_f_d2f12b79.jpg";

export function Hero() {
  return (
    <section className="relative bg-card border-b border-border overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background/20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 sm:mb-6 bg-white/90 dark:bg-black/70 backdrop-blur-sm border-white/20" data-testid="badge-farmers">
            <Sprout className="h-3 w-3 mr-1.5" />
            Trusted by 100K+ Farmers
          </Badge>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-white mb-4 sm:mb-6 leading-tight px-2 drop-shadow-2xl">
            AI-Powered Agricultural Intelligence
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 dark:text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 drop-shadow-lg">
            Empowering farmers with multilingual AI advisory for crop management, livestock care, disease detection, and real-time market insights. Available in 20+ Indian languages.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            <Link href="/chat">
              <Button size="lg" variant="default" className="w-full sm:w-auto min-w-[200px] shadow-xl hover:shadow-2xl transition-all" data-testid="button-hero-launch">
                Launch Copilot
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px] bg-white/10 dark:bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 dark:hover:bg-white/20 hover:text-white dark:hover:text-white shadow-xl" data-testid="button-watch-demo">
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto px-4">
            <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 border border-white/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white dark:text-white mb-1" data-testid="stat-topics">
                4000+
              </div>
              <div className="text-xs sm:text-sm text-white/80 dark:text-white/80">Topics Covered</div>
            </div>
            <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 border border-white/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white dark:text-white mb-1" data-testid="stat-accuracy">
                95%
              </div>
              <div className="text-xs sm:text-sm text-white/80 dark:text-white/80">Accuracy Rate</div>
            </div>
            <div className="bg-white/10 dark:bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 border border-white/20">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white dark:text-white mb-1" data-testid="stat-languages">
                20+
              </div>
              <div className="text-xs sm:text-sm text-white/80 dark:text-white/80">Languages</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
