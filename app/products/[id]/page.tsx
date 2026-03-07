'use client';

import { Header } from '@/components/header';
import { ProductCard } from '@/components/product-card';
import { getProductById, products } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const product = getProductById(id);
  const { addItem } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem(product, quantity);
      setAdded(true);
      setIsAdding(false);

      setTimeout(() => setAdded(false), 2000);
    }, 300);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:gap-12 md:grid-cols-2 mb-20">
          {/* Product Image */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="text-7xl font-light text-muted-foreground mb-4">{product.name.charAt(0)}</div>
                <div className="text-muted-foreground">[Product Image]</div>
              </div>
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-sm font-bold px-3 py-1.5 rounded-lg">
                  Save {discount}%
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-accent text-accent'
                        : 'text-border'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} out of 5 ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {product.inStock ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Description */}
            <div className="border-t border-border pt-6">
              <p className="text-foreground leading-relaxed mb-4">
                {product.description}
              </p>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">Key Features:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-foreground">Quantity:</span>
                <div className="flex items-center border border-input rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!product.inStock}
                    className="px-3 py-2 text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    disabled={!product.inStock}
                    className="w-12 text-center border-0 bg-transparent text-foreground focus:outline-none focus:ring-0 disabled:opacity-50"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!product.inStock}
                    className="px-3 py-2 text-foreground hover:bg-muted disabled:opacity-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className={`w-full py-4 px-4 rounded-lg font-semibold text-base flex items-center justify-center gap-2 transition-all ${
                  added
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>

              <button
                onClick={() => router.push('/cart')}
                className="w-full py-4 px-4 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors"
              >
                Continue to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border pt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

import React from 'react';
