import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { MessageSquare, Globe, Zap } from "lucide-react";
import logoImage from "@assets/Untitled_1759746112310.png";

export function ChatDemo() {
  return (
    <section className="py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-3 xs:mb-4">
              <MessageSquare className="h-3 w-3 mr-1.5" />
              PashuAI
            </Badge>
            <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-3 xs:mb-4">
              Your AI Agricultural Assistant
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-muted-foreground mb-5 xs:mb-6 leading-relaxed">
              Chat with our intelligent copilot for instant answers to your farming questions. Powered by advanced AI models trained on agricultural knowledge.
            </p>

            <div className="space-y-3 xs:space-y-4 mb-5 xs:mb-6">
              <div className="flex items-start gap-2.5 xs:gap-3" data-testid="feature-multilingual">
                <Globe className="h-4 w-4 xs:h-5 xs:w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm xs:text-base font-medium text-foreground mb-0.5 xs:mb-1">Multilingual Support</h4>
                  <p className="text-xs xs:text-sm text-muted-foreground leading-relaxed">
                    Converse in Hindi, English, or 20+ regional languages
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 xs:gap-3" data-testid="feature-contextual">
                <MessageSquare className="h-4 w-4 xs:h-5 xs:w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm xs:text-base font-medium text-foreground mb-0.5 xs:mb-1">Contextual Understanding</h4>
                  <p className="text-xs xs:text-sm text-muted-foreground leading-relaxed">
                    Remembers your farm details and previous conversations
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 xs:gap-3" data-testid="feature-realtime">
                <Zap className="h-4 w-4 xs:h-5 xs:w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm xs:text-base font-medium text-foreground mb-0.5 xs:mb-1">Real-time Responses</h4>
                  <p className="text-xs xs:text-sm text-muted-foreground leading-relaxed">
                    Get instant expert advice powered by Gemini AI
                  </p>
                </div>
              </div>
            </div>

            <Link href="/chat">
              <Button size="lg" className="w-full sm:w-auto" data-testid="button-try-demo">
                Try Live Demo
              </Button>
            </Link>
          </div>

          <Card className="p-5 xs:p-6 sm:p-7 md:p-8 bg-card border-border/50">
            <div className="flex items-center gap-3 xs:gap-4 mb-5 xs:mb-6 pb-5 xs:pb-6 border-b border-border/50">
              <div className="h-10 w-10 xs:h-12 xs:w-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 p-1">
                <img src={logoImage} alt="PashuAI Logo" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-foreground text-sm xs:text-base truncate">PashuAI</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">Active</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 xs:space-y-5">
              <div className="rounded-2xl px-4 xs:px-5 py-3 xs:py-4 bg-muted/80 border border-border/50">
                <p className="text-xs xs:text-sm sm:text-[15px] text-foreground leading-relaxed">
                  Namaste! I'm your AI agricultural assistant. I can help with crop management, livestock care, disease detection, and market prices. How can I assist you today?
                </p>
              </div>

              <div className="flex justify-end">
                <div className="rounded-2xl px-4 xs:px-5 py-3 xs:py-4 bg-primary text-primary-foreground max-w-[90%] xs:max-w-[85%]">
                  <p className="text-xs xs:text-sm sm:text-[15px] leading-relaxed">
                    My wheat crop is showing yellow spots on leaves. What could be the problem?
                  </p>
                </div>
              </div>

              <div className="rounded-2xl px-4 xs:px-5 py-3 xs:py-4 bg-muted/80 border border-border/50">
                <p className="text-xs xs:text-sm sm:text-[15px] text-foreground mb-2 xs:mb-3 leading-relaxed">
                  Yellow spots on wheat leaves could indicate:
                </p>
                <ul className="text-xs xs:text-sm sm:text-[15px] text-foreground space-y-1 xs:space-y-1.5 list-disc list-inside ml-0.5 xs:ml-1">
                  <li>Wheat rust (fungal disease)</li>
                  <li>Nitrogen deficiency</li>
                  <li>Septoria leaf blotch</li>
                </ul>
                <p className="text-xs xs:text-sm sm:text-[15px] text-foreground mt-2 xs:mt-3 leading-relaxed">
                  Would you like to upload a photo for precise diagnosis?
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
