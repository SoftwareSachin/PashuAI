export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground text-lg mb-3">PashuAI</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered agricultural intelligence for the modern farmer.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#models" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Models</a></li>
              <li><a href="#use-cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Use Cases</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">API</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © 2025 PashuAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
