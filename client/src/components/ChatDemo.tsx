import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { MessageSquare, Globe, Zap } from "lucide-react";

export function ChatDemo() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4">
              <MessageSquare className="h-3 w-3 mr-1.5" />
              PashuAI
            </Badge>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Your AI Agricultural Assistant
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Chat with our intelligent copilot for instant answers to your farming questions. Powered by advanced AI models trained on agricultural knowledge.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Multilingual Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Converse in Hindi, English, or 20+ regional languages
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Contextual Understanding</h4>
                  <p className="text-sm text-muted-foreground">
                    Remembers your farm details and previous conversations
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Real-time Responses</h4>
                  <p className="text-sm text-muted-foreground">
                    Get instant expert advice powered by Gemini AI
                  </p>
                </div>
              </div>
            </div>

            <Link href="/chat">
              <Button size="lg" data-testid="button-try-demo">
                Try Live Demo
              </Button>
            </Link>
          </div>

          <Card className="p-6 bg-card">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">PashuAI</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                      Online
                    </Badge>
                    <span className="text-xs text-muted-foreground">Ready to help</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="p-4 bg-muted border-none">
                <p className="text-sm text-foreground">
                  Namaste! I'm your AI agricultural assistant. I can help with crop management, livestock care, disease detection, and market prices. How can I assist you today?
                </p>
              </Card>

              <Card className="p-4 bg-primary text-primary-foreground border-none ml-8">
                <p className="text-sm">
                  My wheat crop is showing yellow spots on leaves. What could be the problem?
                </p>
              </Card>

              <Card className="p-4 bg-muted border-none">
                <p className="text-sm text-foreground mb-3">
                  Yellow spots on wheat leaves could indicate:
                </p>
                <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
                  <li>Wheat rust (fungal disease)</li>
                  <li>Nitrogen deficiency</li>
                  <li>Septoria leaf blotch</li>
                </ul>
                <p className="text-sm text-foreground mt-3">
                  Would you like to upload a photo for precise diagnosis?
                </p>
              </Card>
            </div>

            <div className="mt-4 pt-4 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">Powered by Gemini AI Models</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
