import logoImage from "@assets/Untitled_1759746112310.png";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-card to-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4">
              <img 
                src={logoImage} 
                alt="Pashu AI" 
                className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain max-w-full"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              AI-powered agricultural intelligence empowering farmers with multilingual advisory for crop management, livestock care, and real-time market insights.
            </p>
            <div className="flex gap-3 mt-4">
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110" 
                data-testid="footer-social-twitter"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110" 
                data-testid="footer-social-linkedin"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110" 
                data-testid="footer-social-facebook"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-base mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#features" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group" 
                  data-testid="footer-link-features"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Features</span>
                </a>
              </li>
              <li>
                <a 
                  href="#models" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group" 
                  data-testid="footer-link-models"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">AI Models</span>
                </a>
              </li>
              <li>
                <a 
                  href="#use-cases" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group" 
                  data-testid="footer-link-use-cases"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Use Cases</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group" 
                  data-testid="footer-link-pricing"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Pricing</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-base mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group" 
                  data-testid="footer-link-docs"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Documentation</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group" 
                  data-testid="footer-link-api"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">API Reference</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group" 
                  data-testid="footer-link-support"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Support Center</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group" 
                  data-testid="footer-link-blog"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Blog</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-base mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group" 
                  data-testid="footer-link-about"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">About Us</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group" 
                  data-testid="footer-link-contact"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Contact</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group" 
                  data-testid="footer-link-privacy"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group" 
                  data-testid="footer-link-terms"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Terms of Service</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Pashu AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <span>Made with care for farmers</span>
              <span className="hidden md:inline">•</span>
              <span>Trusted by 100K+ farmers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
