import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 md:p-12 text-center bg-background">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and agribusinesses already using AI-powered advisory
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/chat">
              <Button size="lg" data-testid="button-cta-start">
                Start Free Chat
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" data-testid="button-cta-demo">
              Schedule Demo
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">Free for farmers</span>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span>6-8 week enterprise deployment</span>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span>95% success rate</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
