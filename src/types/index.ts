export interface Product {
  id: string;
  name: string;
  namebn?: string;
  category: 'men' | 'women' | 'kids';
  subcategory: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isTraditional?: boolean;
  occasion?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  preferences: {
    size: string;
    favoriteColors: string[];
    budget: {
      min: number;
      max: number;
    };
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  products?: Product[];
}

export interface VirtualTryOn {
  id: string;
  userId: string;
  productId: string;
  userPhoto: string;
  result: string;
  timestamp: Date;
}