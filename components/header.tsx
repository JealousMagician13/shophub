'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { ShoppingCart, Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Header() {
  const { getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const totalItems = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
            <span>ShopHub</span>
          </Link>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            className="hidden flex-1 md:flex"
          >
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Navigation & Cart */}
          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex gap-6">
              <Link 
                href="/products" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Shop
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
            </nav>
            
            <Link
              href="/cart"
              className="relative flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-foreground hover:bg-muted transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <form 
          onSubmit={handleSearch}
          className="mt-3 flex md:hidden"
        >
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-input bg-card px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
