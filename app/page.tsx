import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 6);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
              Discover Premium Products for Your Lifestyle
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Shop our curated collection of high-quality products from electronics to fashion. 
              Enjoy fast shipping, secure checkout, and excellent customer service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/10 via-muted to-accent/10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-light text-muted-foreground mb-4">✨</div>
              <div className="text-muted-foreground">Premium Shopping Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground">
            Handpicked selections of our most popular items
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
          >
            View All Products
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6 space-y-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary text-xl">
              🚚
            </div>
            <h3 className="font-semibold text-foreground text-lg">Fast Shipping</h3>
            <p className="text-sm text-muted-foreground">
              Get your orders delivered quickly with our reliable shipping partners.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 space-y-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary text-xl">
              🛡️
            </div>
            <h3 className="font-semibold text-foreground text-lg">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">
              Your payment information is encrypted and protected at all times.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 space-y-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary text-xl">
              ⭐
            </div>
            <h3 className="font-semibold text-foreground text-lg">Quality Guarantee</h3>
            <p className="text-sm text-muted-foreground">
              All products are verified for quality. Satisfaction guaranteed.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h4 className="font-semibold text-foreground mb-4">ShopHub</h4>
              <p className="text-sm text-muted-foreground">
                Your destination for premium products and exceptional customer service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/products" className="hover:text-primary">All Products</Link></li>
                <li><Link href="/products" className="hover:text-primary">New Arrivals</Link></li>
                <li><Link href="/products" className="hover:text-primary">Best Sellers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link href="/about" className="hover:text-primary">Contact</Link></li>
                <li><Link href="/about" className="hover:text-primary">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary">Help Center</Link></li>
                <li><Link href="/about" className="hover:text-primary">Shipping Info</Link></li>
                <li><Link href="/about" className="hover:text-primary">Returns</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
