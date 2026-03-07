export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Leather Backpack",
    description: "High-quality leather backpack perfect for travel and daily use. Features multiple compartments and comfortable straps.",
    price: 129.99,
    originalPrice: 179.99,
    image: "/images/backpack.jpg",
    category: "Bags",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    tags: ["leather", "travel", "durable"],
  },
  {
    id: "2",
    name: "Wireless Noise-Canceling Headphones",
    description: "Professional-grade wireless headphones with active noise cancellation and 30-hour battery life.",
    price: 249.99,
    originalPrice: 349.99,
    image: "/images/headphones.jpg",
    category: "Electronics",
    rating: 4.9,
    reviews: 512,
    inStock: true,
    tags: ["wireless", "audio", "tech"],
  },
  {
    id: "3",
    name: "Minimalist Watch",
    description: "Elegant minimalist watch with stainless steel case and genuine leather strap.",
    price: 89.99,
    image: "/images/watch.jpg",
    category: "Accessories",
    rating: 4.7,
    reviews: 189,
    inStock: true,
    tags: ["watch", "fashion", "luxury"],
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    description: "Soft and breathable organic cotton t-shirt. Available in multiple colors.",
    price: 34.99,
    originalPrice: 49.99,
    image: "/images/tshirt.jpg",
    category: "Clothing",
    rating: 4.6,
    reviews: 145,
    inStock: true,
    tags: ["cotton", "eco-friendly", "comfort"],
  },
  {
    id: "5",
    name: "Portable Phone Charger",
    description: "Fast-charging portable power bank with 20000mAh capacity. Charges multiple devices simultaneously.",
    price: 44.99,
    image: "/images/charger.jpg",
    category: "Electronics",
    rating: 4.5,
    reviews: 398,
    inStock: true,
    tags: ["charging", "portable", "tech"],
  },
  {
    id: "6",
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat made from eco-friendly natural rubber. Perfect for all yoga styles.",
    price: 59.99,
    originalPrice: 79.99,
    image: "/images/yoga-mat.jpg",
    category: "Fitness",
    rating: 4.7,
    reviews: 267,
    inStock: true,
    tags: ["yoga", "fitness", "eco-friendly"],
  },
  {
    id: "7",
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 39.99,
    image: "/images/water-bottle.jpg",
    category: "Sports",
    rating: 4.8,
    reviews: 421,
    inStock: true,
    tags: ["bottle", "hydration", "durable"],
  },
  {
    id: "8",
    name: "Designer Sunglasses",
    description: "Premium UV protection sunglasses with polarized lenses and stylish frame design.",
    price: 149.99,
    originalPrice: 199.99,
    image: "/images/sunglasses.jpg",
    category: "Accessories",
    rating: 4.6,
    reviews: 178,
    inStock: true,
    tags: ["sunglasses", "fashion", "protection"],
  },
];

export const categories = [
  "All Products",
  "Bags",
  "Electronics",
  "Accessories",
  "Clothing",
  "Fitness",
  "Sports",
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All Products") return products;
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
