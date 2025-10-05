import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-xl font-bold text-foreground cursor-pointer" data-testid="link-home">
                PashuAI
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features">
              Features
            </a>
            <a href="#models" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-models">
              AI Models
            </a>
            <a href="#use-cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-use-cases">
              Use Cases
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/chat">
              <Button variant="default" data-testid="button-launch-copilot">
                Launch Copilot
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu"
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features-mobile">
                Features
              </a>
              <a href="#models" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-models-mobile">
                AI Models
              </a>
              <a href="#use-cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-use-cases-mobile">
                Use Cases
              </a>
              <Link href="/chat">
                <Button variant="default" className="w-full" data-testid="button-launch-copilot-mobile">
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
