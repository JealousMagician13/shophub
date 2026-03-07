'use client';

import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { Star, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    setTimeout(() => {
      addItem(product, 1);
      setAdded(true);
      setIsAdding(false);
      
      setTimeout(() => setAdded(false), 2000);
    }, 300);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group h-full overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:border-primary">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted h-64">
          <div className="h-full w-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <div className="text-center text-muted-foreground">
              <div className="text-4xl font-light mb-2">{product.name.charAt(0)}</div>
              <div className="text-xs">[Product Image]</div>
            </div>
          </div>
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-md">
              -{discount}%
            </div>
          )}
          
          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3">
          {/* Title & Category */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {product.category}
            </p>
            <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-accent text-accent'
                      : 'text-border'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className={`w-full py-2.5 px-3 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              added
                ? 'bg-accent text-accent-foreground'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
