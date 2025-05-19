
export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif font-semibold mb-4">Retreats Around The World</h3>
            <p className="text-muted-foreground text-sm">
              Discover transformative retreat experiences in the world's most inspiring locations.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Retreat Types</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Destinations</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Featured Retreats</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Last Minute</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Host</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">List Your Retreat</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Host Resources</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Community</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Host Insurance</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Safety Information</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Cancellation Options</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-retreat-forest transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 Retreats Around The World. All rights reserved.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-muted-foreground hover:text-retreat-forest transition-colors">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-retreat-forest transition-colors">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-retreat-forest transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
