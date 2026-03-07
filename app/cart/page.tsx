'use client';

import { Header } from '@/components/header';
import { useCart } from '@/lib/cart-context';
import { Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const router = useRouter();
  const total = getTotalPrice();
  const subtotal = total;
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 10;
  const grandTotal = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Header />

        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="text-center py-12">
            <div className="mb-6 text-6xl">🛒</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some products to get started with your purchase.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Continue Shopping
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col sm:flex-row gap-4 rounded-lg border border-border bg-card p-4 sm:p-6"
              >
                {/* Product Image */}
                <div className="flex-shrink-0 w-full sm:w-24 h-24 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="text-2xl font-light">{item.product.name.charAt(0)}</div>
                    <div className="text-xs">[Image]</div>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.product.description}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Category: {item.product.category}
                  </div>
                </div>

                {/* Quantity & Price */}
                <div className="flex items-end justify-between sm:flex-col sm:items-end gap-4">
                  <div className="flex items-center border border-input rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2 py-1 text-foreground hover:bg-muted transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.product.id, Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-10 text-center border-0 bg-transparent text-foreground focus:outline-none focus:ring-0"
                    />
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2 py-1 text-foreground hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${item.product.price.toFixed(2)} each
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-lg border border-border bg-card p-6 sticky top-20">
            <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-foreground font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (10%)</span>
                <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-6 flex justify-between text-lg font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">${grandTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={() => router.push('/checkout')}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mb-3"
            >
              Proceed to Checkout
              <ArrowRight className="h-5 w-5" />
            </button>

            <Link
              href="/products"
              className="block w-full py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors text-center flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              Continue Shopping
            </Link>

            {subtotal <= 100 && (
              <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm text-accent">
                  Free shipping on orders over $100! Add ${(100 - subtotal).toFixed(2)} more.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
