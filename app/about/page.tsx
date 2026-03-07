import { Header } from '@/components/header';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            About ShopHub
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            We're dedicated to bringing you the best shopping experience with premium products, 
            fast shipping, and exceptional customer service.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To make quality products accessible to everyone by offering a curated selection 
                of items that meet our rigorous quality standards. We believe in transparent 
                pricing, honest product descriptions, and putting customer satisfaction first.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Our Values</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong className="text-foreground">Quality:</strong> We hand-pick every product</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong className="text-foreground">Trust:</strong> Transparent and honest dealings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong className="text-foreground">Service:</strong> Customer satisfaction guaranteed</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong className="text-foreground">Innovation:</strong> Always improving the experience</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 via-muted to-accent/10 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-6xl font-light mb-4">🎯</div>
              <p>Our Commitment to Excellence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y border-border bg-muted/30 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">50K+</p>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">1000+</p>
              <p className="text-muted-foreground">Premium Products</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">24/7</p>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">99%</p>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="rounded-lg border border-border bg-card p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Have Questions?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our customer support team is available 24/7 to help you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@shophub.com"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Email Us
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Return to Shopping */}
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
        >
          Back to Shopping
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </main>
  );
}
