import { Product, ChatMessage } from '../types';
import { allProducts } from '../data/products';

interface ChatContext {
  userPreferences: {
    budget?: { min: number; max: number };
    category?: string;
    occasion?: string;
    size?: string;
    color?: string;
    style?: string;
  };
  conversationHistory: ChatMessage[];
}

class AIChatbot {
  private context: ChatContext = {
    userPreferences: {},
    conversationHistory: []
  };

  private keywords = {
    categories: {
      'men': ['men', 'male', 'boys', 'guys', 'gents', 'পুরুষ', 'ছেলে'],
      'women': ['women', 'female', 'girls', 'ladies', 'মহিলা', 'মেয়ে', 'নারী'],
      'kids': ['kids', 'children', 'child', 'baby', 'বাচ্চা', 'শিশু']
    },
    occasions: {
      'wedding': ['wedding', 'marriage', 'বিয়ে', 'শাদী'],
      'eid': ['eid', 'festival', 'ঈদ'],
      'office': ['office', 'work', 'formal', 'অফিস', 'কাজ'],
      'casual': ['casual', 'daily', 'regular', 'নিয়মিত'],
      'party': ['party', 'celebration', 'পার্টি']
    },
    colors: ['red', 'blue', 'green', 'yellow', 'white', 'black', 'pink', 'লাল', 'নীল', 'সবুজ'],
    price: ['cheap', 'expensive', 'budget', 'under', 'below', 'above', 'সস্তা', 'দামী']
  };

  updateContext(message: ChatMessage) {
    this.context.conversationHistory.push(message);
    
    if (!message.isBot) {
      this.extractPreferences(message.text);
    }
  }

  private extractPreferences(userMessage: string) {
    const message = userMessage.toLowerCase();
    
    // Extract category
    Object.entries(this.keywords.categories).forEach(([category, keywords]) => {
      if (keywords.some(keyword => message.includes(keyword))) {
        this.context.userPreferences.category = category;
      }
    });

    // Extract occasion
    Object.entries(this.keywords.occasions).forEach(([occasion, keywords]) => {
      if (keywords.some(keyword => message.includes(keyword))) {
        this.context.userPreferences.occasion = occasion;
      }
    });

    // Extract budget
    const budgetMatch = message.match(/under (\d+)/i) || message.match(/below (\d+)/i);
    if (budgetMatch) {
      this.context.userPreferences.budget = { min: 0, max: parseInt(budgetMatch[1]) };
    }

    // Extract colors
    this.keywords.colors.forEach(color => {
      if (message.includes(color)) {
        this.context.userPreferences.color = color;
      }
    });
  }

  async processMessage(userMessage: string): Promise<{ response: string; products?: Product[] }> {
    const message = userMessage.toLowerCase();
    
    // Update context with user message
    this.updateContext({
      id: Date.now().toString(),
      text: userMessage,
      isBot: false,
      timestamp: new Date()
    });

    let response = '';
    let suggestedProducts: Product[] = [];

    // Greeting responses
    if (this.isGreeting(message)) {
      response = "আসসালামু আলাইকুম! GenAI Fashion এ আপনাকে স্বাগতম। আমি আপনার ব্যক্তিগত ফ্যাশন সহায়ক। আপনি কোন ধরনের পোশাক খুঁজছেন?";
    }
    // Product search
    else if (this.isProductSearch(message)) {
      const searchResults = this.searchProducts(message);
      suggestedProducts = searchResults.slice(0, 6);
      
      if (suggestedProducts.length > 0) {
        response = `আপনার জন্য ${suggestedProducts.length}টি দুর্দান্ত অপশন খুঁজে পেয়েছি! দেখুন এগুলো:`;
      } else {
        response = "দুঃখিত, আপনার চাহিদা অনুযায়ী কোন পণ্য পাওয়া যায়নি। আপনি কি অন্য কিছু খুঁজছেন?";
      }
    }
    // Price inquiry
    else if (this.isPriceInquiry(message)) {
      response = this.handlePriceInquiry(message);
    }
    // Size help
    else if (this.isSizeHelp(message)) {
      response = "আমাদের সাইজ গাইড: S (36\"), M (38\"), L (40\"), XL (42\"), XXL (44\")। আপনার বুকের মাপ অনুযায়ী সাইজ বেছে নিন।";
    }
    // FAQ responses
    else if (this.isFAQ(message)) {
      response = this.handleFAQ(message);
    }
    // Default response with smart suggestions
    else {
      const smartSuggestions = this.getSmartSuggestions();
      suggestedProducts = smartSuggestions;
      response = "আমি আপনাকে সাহায্য করতে চাই! এই পণ্যগুলো দেখুন বা আরো নির্দিষ্ট করে বলুন আপনি কী খুঁজছেন।";
    }

    return { response, products: suggestedProducts };
  }

  private isGreeting(message: string): boolean {
    const greetings = ['hello', 'hi', 'hey', 'আসসালামু আলাইকুম', 'হ্যালো', 'নমস্কার'];
    return greetings.some(greeting => message.includes(greeting));
  }

  private isProductSearch(message: string): boolean {
    const searchTerms = ['show', 'find', 'looking for', 'need', 'want', 'দেখাও', 'খুঁজছি', 'চাই'];
    return searchTerms.some(term => message.includes(term));
  }

  private isPriceInquiry(message: string): boolean {
    const priceTerms = ['price', 'cost', 'expensive', 'cheap', 'দাম', 'কত', 'টাকা'];
    return priceTerms.some(term => message.includes(term));
  }

  private isSizeHelp(message: string): boolean {
    const sizeTerms = ['size', 'fit', 'measurement', 'সাইজ', 'মাপ'];
    return sizeTerms.some(term => message.includes(term));
  }

  private isFAQ(message: string): boolean {
    const faqTerms = ['delivery', 'return', 'exchange', 'payment', 'ডেলিভারি', 'ফেরত'];
    return faqTerms.some(term => message.includes(term));
  }

  private searchProducts(query: string): Product[] {
    const preferences = this.context.userPreferences;
    let filtered = allProducts;

    // Filter by category
    if (preferences.category) {
      filtered = filtered.filter(p => p.category === preferences.category);
    }

    // Filter by occasion
    if (preferences.occasion) {
      filtered = filtered.filter(p => 
        p.occasion && p.occasion.includes(preferences.occasion!)
      );
    }

    // Filter by budget
    if (preferences.budget) {
      filtered = filtered.filter(p => 
        p.price >= preferences.budget!.min && p.price <= preferences.budget!.max
      );
    }

    // Filter by color
    if (preferences.color) {
      filtered = filtered.filter(p => 
        p.colors.some(color => 
          color.toLowerCase().includes(preferences.color!) ||
          preferences.color!.includes(color.toLowerCase())
        )
      );
    }

    // Text-based search
    const searchTerms = query.toLowerCase().split(' ');
    filtered = filtered.filter(product => {
      const searchText = `${product.name} ${product.namebn || ''} ${product.description} ${product.subcategory}`.toLowerCase();
      return searchTerms.some(term => searchText.includes(term));
    });

    // Sort by rating and reviews
    return filtered.sort((a, b) => {
      const scoreA = a.rating * Math.log(a.reviews + 1);
      const scoreB = b.rating * Math.log(b.reviews + 1);
      return scoreB - scoreA;
    });
  }

  private handlePriceInquiry(message: string): string {
    const budgetRanges = [
      { range: 'under 1000', text: '১০০০ টাকার নিচে', products: allProducts.filter(p => p.price < 1000) },
      { range: 'under 2000', text: '২০০০ টাকার নিচে', products: allProducts.filter(p => p.price < 2000) },
      { range: 'under 5000', text: '৫০০০ টাকার নিচে', products: allProducts.filter(p => p.price < 5000) }
    ];

    const matchedRange = budgetRanges.find(range => message.includes(range.range));
    
    if (matchedRange) {
      return `${matchedRange.text} ${matchedRange.products.length}টি পণ্য আছে। আপনি কোন ক্যাটাগরিতে দেখতে চান?`;
    }

    return "আমাদের পণ্যের দাম ৩৮০ টাকা থেকে ৮৫০০ টাকা পর্যন্ত। আপনার বাজেট কত?";
  }

  private handleFAQ(message: string): string {
    if (message.includes('delivery') || message.includes('ডেলিভারি')) {
      return "আমরা সারা বাংলাদেশে ২-৩ দিনের মধ্যে ডেলিভারি দিয়ে থাকি। ঢাকার ভিতরে হোম ডেলিভারি ফ্রি!";
    }
    
    if (message.includes('return') || message.includes('ফেরত')) {
      return "১৫ দিনের মধ্যে এক্সচেঞ্জ/রিটার্ন পলিসি আছে। পণ্য অবশ্যই অব্যবহৃত অবস্থায় থাকতে হবে।";
    }
    
    if (message.includes('payment') || message.includes('পেমেন্ট')) {
      return "আমরা ক্যাশ অন ডেলিভারি, বিকাশ, নগদ এবং কার্ড পেমেন্ট গ্রহণ করি।";
    }
    
    return "আরো তথ্যের জন্য আমাদের কাস্টমার সার্ভিসে যোগাযোগ করুন: ০১৭১১-১২৩৪৫৬";
  }

  private getSmartSuggestions(): Product[] {
    const { category, occasion } = this.context.userPreferences;
    
    let suggestions = allProducts;
    
    if (category) {
      suggestions = suggestions.filter(p => p.category === category);
    }
    
    if (occasion) {
      suggestions = suggestions.filter(p => 
        p.occasion && p.occasion.includes(occasion)
      );
    }
    
    // Return top-rated products
    return suggestions
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }

  clearContext() {
    this.context = {
      userPreferences: {},
      conversationHistory: []
    };
  }
}

export const aiChatbot = new AIChatbot();