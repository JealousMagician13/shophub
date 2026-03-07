import { Header } from '@/components/header';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you will receive an email with a tracking number. You can use this to track your package in real-time.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on all items. If you are not satisfied with your purchase, simply contact our support team.'
    },
    {
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free standard shipping on orders over $100. Orders under $100 have a flat $10 shipping fee.'
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard shipping typically takes 5-7 business days. Express shipping is also available at checkout for faster delivery.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Absolutely. We use industry-standard SSL encryption to protect all payment information. Your data is completely secure.'
    },
    {
      question: 'Can I cancel my order?',
      answer: 'Orders can be cancelled within 24 hours of placement. After that, please contact our support team if you need assistance.'
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="space-y-6 text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Help & Support</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions or contact our support team
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          <div className="rounded-lg border border-border bg-card p-6 text-center space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary text-xl">
              📧
            </div>
            <h3 className="font-semibold text-foreground text-lg">Email Support</h3>
            <p className="text-sm text-muted-foreground">
              Response time: Within 24 hours
            </p>
            <a
              href="mailto:support@shophub.com"
              className="inline-flex items-center justify-center text-primary font-semibold hover:underline"
            >
              support@shophub.com
            </a>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-center space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary text-xl">
              📞
            </div>
            <h3 className="font-semibold text-foreground text-lg">Phone Support</h3>
            <p className="text-sm text-muted-foreground">
              Available: 9 AM - 6 PM EST
            </p>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center justify-center text-primary font-semibold hover:underline"
            >
              +1 (234) 567-890
            </a>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 text-center space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary text-xl">
              💬
            </div>
            <h3 className="font-semibold text-foreground text-lg">Live Chat</h3>
            <p className="text-sm text-muted-foreground">
              Instant answers 24/7
            </p>
            <button className="inline-flex items-center justify-center text-primary font-semibold hover:underline">
              Start Chat
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
              >
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-semibold text-foreground hover:bg-muted/50 transition-colors">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-border px-6 py-4 text-muted-foreground bg-muted/30">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 rounded-lg border border-border bg-card p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Need More Help?</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Link
              href="/about"
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <span className="font-semibold text-foreground">About ShopHub</span>
              <span className="text-primary">→</span>
            </Link>
            <a
              href="#"
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <span className="font-semibold text-foreground">Shipping Information</span>
              <span className="text-primary">→</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <span className="font-semibold text-foreground">Returns & Refunds</span>
              <span className="text-primary">→</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              <span className="font-semibold text-foreground">Privacy Policy</span>
              <span className="text-primary">→</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
