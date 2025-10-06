import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import logoImage from "@assets/Untitled_1759746112310.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 dark:bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28 sm:h-36 md:h-44 lg:h-52">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center cursor-pointer group" data-testid="link-home">
                <img 
                  src={logoImage} 
                  alt="Pashu AI" 
                  className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <a 
              href="#features" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all relative group" 
              data-testid="link-features"
            >
              Features
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300"></span>
            </a>
            <a 
              href="#models" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all relative group" 
              data-testid="link-models"
            >
              AI Models
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300"></span>
            </a>
            <a 
              href="#use-cases" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all relative group" 
              data-testid="link-use-cases"
            >
              Use Cases
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300"></span>
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/chat">
              <Button 
                variant="default" 
                className="relative group overflow-hidden shadow-md hover:shadow-lg transition-all" 
                data-testid="button-launch-copilot"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="relative">Launch Copilot</span>
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 hover:bg-accent/50 rounded-lg transition-colors"
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
          <div className="md:hidden py-4 border-t border-border/40 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2">
              <a 
                href="#features" 
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all" 
                data-testid="link-features-mobile"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#models" 
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all" 
                data-testid="link-models-mobile"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Models
              </a>
              <a 
                href="#use-cases" 
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all" 
                data-testid="link-use-cases-mobile"
                onClick={() => setMobileMenuOpen(false)}
              >
                Use Cases
              </a>
              <Link href="/chat">
                <Button 
                  variant="default" 
                  className="w-full mt-2 shadow-md" 
                  data-testid="button-launch-copilot-mobile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
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
