import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2.5 cursor-pointer" data-testid="link-home">
                <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-base font-semibold text-primary-foreground">PA</span>
                </div>
                <span className="text-lg font-semibold text-foreground">
                  PashuAI
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <a 
              href="#features" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors" 
              data-testid="link-features"
            >
              Features
            </a>
            <a 
              href="#models" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors" 
              data-testid="link-models"
            >
              AI Models
            </a>
            <a 
              href="#use-cases" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors" 
              data-testid="link-use-cases"
            >
              Use Cases
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/chat">
              <Button 
                variant="default" 
                className="font-medium" 
                data-testid="button-launch-copilot"
              >
                Launch Copilot
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              <a 
                href="#features" 
                className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors" 
                data-testid="link-features-mobile"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#models" 
                className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors" 
                data-testid="link-models-mobile"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Models
              </a>
              <a 
                href="#use-cases" 
                className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors" 
                data-testid="link-use-cases-mobile"
                onClick={() => setMobileMenuOpen(false)}
              >
                Use Cases
              </a>
              <Link href="/chat">
                <Button 
                  variant="default" 
                  className="w-full mt-2 font-medium" 
                  data-testid="button-launch-copilot-mobile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Launch Copilot
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
