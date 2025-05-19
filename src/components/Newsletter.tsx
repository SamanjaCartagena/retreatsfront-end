
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <div className="bg-retreat-cream py-16">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
            Get inspired for your next retreat
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join our newsletter and be the first to discover new retreat experiences, exclusive offers and wellness inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white"
            />
            <Button className="bg-retreat-sage hover:bg-retreat-forest whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
