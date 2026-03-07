'use client';

import { Header } from '@/components/header';
import { CheckCircle, ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-' + Math.random().toString(36).substring(7).toUpperCase();
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase. We've received your order and will start processing it right away.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="rounded-lg border border-border bg-card p-8 mb-8 space-y-6">
          {/* Order Number */}
          <div className="pb-6 border-b border-border">
            <p className="text-sm text-muted-foreground mb-1">Order Number</p>
            <p className="text-2xl font-bold text-foreground font-mono">{orderId}</p>
          </div>

          {/* Order Date & Status */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Date</p>
              <p className="text-lg font-semibold text-foreground">{orderDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Status</p>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-600"></div>
                <p className="text-lg font-semibold text-green-600">Processing</p>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm font-semibold text-foreground mb-4">What's Next</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-green-600 mt-1"></div>
                  <div className="w-0.5 h-8 bg-border my-1"></div>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Order Confirmed</p>
                  <p className="text-sm text-muted-foreground">Your order has been successfully placed</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full border-2 border-border mt-1"></div>
                  <div className="w-0.5 h-8 bg-border my-1"></div>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Processing</p>
                  <p className="text-sm text-muted-foreground">We're preparing your items for shipment</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full border-2 border-border mt-1"></div>
                  <div className="w-0.5 h-8 bg-border my-1"></div>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Shipped</p>
                  <p className="text-sm text-muted-foreground">Your package will be on its way soon</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full border-2 border-border mt-1"></div>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Delivered</p>
                  <p className="text-sm text-muted-foreground">Receive your order at your doorstep</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="rounded-lg border border-border bg-muted/30 p-6 mb-8">
          <p className="text-sm text-muted-foreground mb-2">Estimated Delivery</p>
          <p className="text-xl font-bold text-foreground">
            {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Standard shipping (5-7 business days)
          </p>
        </div>

        {/* Email Confirmation */}
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-6 mb-8">
          <p className="text-sm font-semibold text-foreground mb-2">Confirmation Email Sent</p>
          <p className="text-muted-foreground text-sm">
            A confirmation email with order details and tracking information has been sent to your email address.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 sm:flex gap-3 sm:space-y-0">
          <Link
            href="/products"
            className="block flex-1 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors text-center"
          >
            Continue Shopping
          </Link>
          <button className="block flex-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Download className="h-5 w-5" />
            Download Invoice
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground mb-4">Need help with your order?</p>
          <Link
            href="/help"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Contact Support
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
