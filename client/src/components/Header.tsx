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
              <a className="text-xl font-bold text-foreground" data-testid="link-home">
                PashuAI
              </a>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#models" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              AI Models
            </a>
            <a href="#use-cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#models" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                AI Models
              </a>
              <a href="#use-cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
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
