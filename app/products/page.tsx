'use client';

import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import { products, categories } from '@/lib/products';
import { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === 'All Products'
      ? products
      : products.filter((p) => p.category === selectedCategory);

    // Filter by price
    filtered = filtered.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Sort
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming newer items are at the end of the array
        filtered.reverse();
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
            All Products
          </h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex gap-6 md:gap-8">
          {/* Sidebar Filters */}
          <aside className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block md:w-48 flex-shrink-0`}>
            <div className="space-y-6">
              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                      />
                      <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: parseInt(e.target.value) })
                    }
                    className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">${priceRange.min}</span>
                    <span className="text-muted-foreground">${priceRange.max}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('All Products');
                  setPriceRange({ min: 0, max: 1000 });
                  setSortBy('featured');
                }}
                className="w-full py-2 px-3 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Dropdown */}
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="md:hidden py-2 px-3 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Filters
              </button>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 rounded-lg border border-input bg-card text-foreground text-sm cursor-pointer focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All Products');
                    setPriceRange({ min: 0, max: 1000 });
                  }}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
