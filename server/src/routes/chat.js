const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// AI Chatbot message processing
router.post('/', async (req, res) => {
  try {
    const { message, context = {} } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    const response = await processMessage(message, context);

    res.json({
      success: true,
      response: response.text,
      products: response.products || [],
      suggestions: response.suggestions || [],
      context: response.context || {}
    });
  } catch (error) {
    console.error('Chat processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing message',
      error: error.message
    });
  }
});

// Get AI recommendations based on preferences
router.post('/recommendations', async (req, res) => {
  try {
    const { preferences = {} } = req.body;
    const products = await getRecommendations(preferences);

    res.json({
      success: true,
      products,
      message: 'Here are some recommendations based on your preferences'
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting recommendations',
      error: error.message
    });
  }
});

// AI message processing logic
async function processMessage(message, context) {
  const lowerMessage = message.toLowerCase();
  let response = { text: '', products: [], suggestions: [], context: {} };

  try {
    // Greeting responses
    if (isGreeting(lowerMessage)) {
      response.text = "আসসালামু আলাইকুম! GenAI Fashion এ আপনাকে স্বাগতম। আমি আপনার ব্যক্তিগত ফ্যাশন সহায়ক। আপনি কোন ধরনের পোশাক খুঁজছেন?";
      response.suggestions = [
        "Show me red sarees under 3000 tk",
        "পুরুষদের পাঞ্জাবি দেখান",
        "Kids t-shirts for school",
        "Wedding collection for women",
        "What's trending now?"
      ];
    }
    // Product search queries
    else if (isProductSearch(lowerMessage)) {
      const searchResults = await searchProducts(lowerMessage);
      response.products = searchResults.products;
      response.text = searchResults.message;
      response.suggestions = searchResults.suggestions;
    }
    // Price-based queries
    else if (isPriceQuery(lowerMessage)) {
      const priceResults = await handlePriceQuery(lowerMessage);
      response.products = priceResults.products;
      response.text = priceResults.message;
      response.suggestions = priceResults.suggestions;
    }
    // FAQ responses
    else if (isFAQ(lowerMessage)) {
      response = handleFAQ(lowerMessage);
    }
    // Category-specific queries
    else if (isCategoryQuery(lowerMessage)) {
      const categoryResults = await handleCategoryQuery(lowerMessage);
      response.products = categoryResults.products;
      response.text = categoryResults.message;
      response.suggestions = categoryResults.suggestions;
    }
    // Default response with trending products
    else {
      const trendingProducts = await Product.find({ 
        isActive: true,
        $or: [{ trending: true }, { featured: true }]
      })
      .limit(4)
      .sort({ rating: -1, reviews: -1 });

      response.text = "আমি আপনাকে সাহায্য করতে চাই! এই ট্রেন্ডিং পণ্যগুলো দেখুন অথবা আরো নির্দিষ্ট করে বলুন আপনি কী খুঁজছেন।";
      response.products = trendingProducts;
      response.suggestions = [
        "Latest arrivals",
        "Best sellers", 
        "Traditional wear",
        "Modern fashion",
        "Under 2000 tk"
      ];
    }

    return response;
  } catch (error) {
    console.error('Message processing error:', error);
    return {
      text: "দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      products: [],
      suggestions: ["Try again", "Contact support"],
      context: {}
    };
  }
}

// Helper functions
function isGreeting(message) {
  const greetings = ['hello', 'hi', 'hey', 'আসসালামু আলাইকুম', 'হ্যালো', 'নমস্কার', 'সালাম'];
  return greetings.some(greeting => message.includes(greeting));
}

function isProductSearch(message) {
  const searchTerms = ['show', 'find', 'looking for', 'need', 'want', 'দেখাও', 'খুঁজছি', 'চাই', 'saree', 'panjabi', 'shirt', 'dress'];
  return searchTerms.some(term => message.includes(term));
}

function isPriceQuery(message) {
  const priceTerms = ['price', 'cost', 'expensive', 'cheap', 'under', 'below', 'above', 'দাম', 'কত', 'টাকা', 'tk'];
  return priceTerms.some(term => message.includes(term));
}

function isFAQ(message) {
  const faqTerms = ['delivery', 'return', 'exchange', 'payment', 'size', 'ডেলিভারি', 'ফেরত', 'সাইজ', 'পেমেন্ট'];
  return faqTerms.some(term => message.includes(term));
}

function isCategoryQuery(message) {
  const categories = ['men', 'women', 'kids', 'পুরুষ', 'মহিলা', 'বাচ্চা', 'ছেলে', 'মেয়ে'];
  return categories.some(cat => message.includes(cat));
}

async function searchProducts(query) {
  try {
    let filter = { isActive: true };
    let message = '';
    let suggestions = [];

    // Saree search
    if (query.includes('saree') || query.includes('শাড়ি')) {
      filter.$or = [
        { name: { $regex: 'saree', $options: 'i' } },
        { subcategory: 'traditional', category: 'women' }
      ];
      
      // Price filter for sarees
      const priceMatch = query.match(/under (\d+)/);
      if (priceMatch) {
        filter.price = { $lte: parseInt(priceMatch[1]) };
      }

      const products = await Product.find(filter).limit(6).sort({ rating: -1 });
      message = `আপনার জন্য ${products.length}টি সুন্দর শাড়ি খুঁজে পেয়েছি!`;
      suggestions = ["More sarees", "Party wear sarees", "Wedding sarees", "Under 5000 tk"];
      
      return { products, message, suggestions };
    }

    // Panjabi search
    if (query.includes('panjabi') || query.includes('পাঞ্জাবি') || query.includes('kurta')) {
      filter.$or = [
        { name: { $regex: 'panjabi|kurta', $options: 'i' } },
        { subcategory: 'traditional', category: 'men' }
      ];

      const products = await Product.find(filter).limit(6).sort({ rating: -1 });
      message = `পুরুষদের জন্য ${products.length}টি চমৎকার পাঞ্জাবি আছে:`;
      suggestions = ["Eid collection", "Wedding panjabis", "Casual kurtas"];
      
      return { products, message, suggestions };
    }

    // Kids search
    if (query.includes('kids') || query.includes('children') || query.includes('বাচ্চা')) {
      filter.category = 'kids';
      
      if (query.includes('school') || query.includes('uniform')) {
        filter.subcategory = 'uniform';
      }

      const products = await Product.find(filter).limit(6).sort({ rating: -1 });
      message = `বাচ্চাদের জন্য ${products.length}টি সুন্দর পোশাক দেখুন:`;
      suggestions = ["School uniforms", "Party wear for kids", "Casual kids wear"];
      
      return { products, message, suggestions };
    }

    // General search
    const searchTerms = query.split(' ').filter(term => term.length > 2);
    if (searchTerms.length > 0) {
      filter.$or = [
        { name: { $regex: searchTerms.join('|'), $options: 'i' } },
        { description: { $regex: searchTerms.join('|'), $options: 'i' } },
        { tags: { $in: searchTerms.map(term => new RegExp(term, 'i')) } }
      ];

      const products = await Product.find(filter).limit(6).sort({ rating: -1 });
      message = products.length > 0 
        ? `আপনার খোঁজের জন্য ${products.length}টি পণ্য পেয়েছি:`
        : "দুঃখিত, আপনার চাহিদা অনুযায়ী কোন পণ্য পাওয়া যায়নি।";
      suggestions = ["Try different keywords", "Browse categories", "Popular items"];
      
      return { products, message, suggestions };
    }

    // Default fallback
    const products = await Product.find({ isActive: true }).limit(4).sort({ rating: -1 });
    message = "এই জনপ্রিয় পণ্যগুলো দেখুন:";
    suggestions = ["Men's fashion", "Women's fashion", "Kids collection"];
    
    return { products, message, suggestions };

  } catch (error) {
    console.error('Product search error:', error);
    return {
      products: [],
      message: "দুঃখিত, পণ্য খোঁজার সময় সমস্যা হয়েছে।",
      suggestions: ["Try again", "Browse categories"]
    };
  }
}

async function handlePriceQuery(query) {
  try {
    const priceMatch = query.match(/under (\d+)/i) || query.match(/below (\d+)/i);
    
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1]);
      const products = await Product.find({
        price: { $lte: maxPrice },
        isActive: true
      }).limit(6).sort({ rating: -1 });

      return {
        products,
        message: `${maxPrice} টাকার নিচে ${products.length}টি পণ্য পেয়েছি:`,
        suggestions: [`Under ${maxPrice + 500} tk`, "Best deals", "Sale items"]
      };
    }

    // General price inquiry
    const budgetRanges = [
      { range: 'Under 1000 tk', filter: { price: { $lt: 1000 } } },
      { range: 'Under 2000 tk', filter: { price: { $lt: 2000 } } },
      { range: 'Under 5000 tk', filter: { price: { $lt: 5000 } } }
    ];

    const products = await Product.find({ isActive: true }).limit(4).sort({ price: 1 });
    
    return {
      products,
      message: "আমাদের পণ্যের দাম ৩৮০ টাকা থেকে ৮৫০০ টাকা পর্যন্ত। আপনার বাজেট কত?",
      suggestions: budgetRanges.map(range => range.range)
    };

  } catch (error) {
    console.error('Price query error:', error);
    return {
      products: [],
      message: "দাম সংক্রান্ত তথ্য পেতে সমস্যা হয়েছে।",
      suggestions: ["Try again", "Browse by category"]
    };
  }
}

function handleFAQ(query) {
  if (query.includes('delivery') || query.includes('ডেলিভারি')) {
    return {
      text: "আমরা সারা বাংলাদেশে ২-৩ দিনের মধ্যে ডেলিভারি দিয়ে থাকি। ঢাকার ভিতরে হোম ডেলিভারি ফ্রি! 🚚",
      products: [],
      suggestions: ["Return policy", "Payment methods", "Track order"]
    };
  }
  
  if (query.includes('return') || query.includes('ফেরত')) {
    return {
      text: "১৫ দিনের মধ্যে এক্সচেঞ্জ/রিটার্ন পলিসি আছে। পণ্য অবশ্যই অব্যবহৃত অবস্থায় থাকতে হবে।",
      products: [],
      suggestions: ["Delivery info", "Size guide", "Contact support"]
    };
  }
  
  if (query.includes('payment') || query.includes('পেমেন্ট')) {
    return {
      text: "আমরা ক্যাশ অন ডেলিভারি, বিকাশ, নগদ, রকেট এবং কার্ড পেমেন্ট গ্রহণ করি।",
      products: [],
      suggestions: ["Delivery info", "Return policy", "Order tracking"]
    };
  }
  
  if (query.includes('size') || query.includes('সাইজ')) {
    return {
      text: "আমাদের সাইজ গাইড: S (36\"), M (38\"), L (40\"), XL (42\"), XXL (44\")। আপনার বুকের মাপ অনুযায়ী সাইজ বেছে নিন।",
      products: [],
      suggestions: ["Size chart", "How to measure", "Exchange policy"]
    };
  }
  
  return {
    text: "আরো তথ্যের জন্য আমাদের কাস্টমার সার্ভিসে যোগাযোগ করুন: ০১৭১১-১২৩৪৫৬",
    products: [],
    suggestions: ["Delivery info", "Return policy", "Size guide"]
  };
}

async function handleCategoryQuery(query) {
  try {
    let category = '';
    
    if (query.includes('men') || query.includes('পুরুষ') || query.includes('ছেলে')) {
      category = 'men';
    } else if (query.includes('women') || query.includes('মহিলা') || query.includes('মেয়ে')) {
      category = 'women';
    } else if (query.includes('kids') || query.includes('বাচ্চা')) {
      category = 'kids';
    }

    if (category) {
      const products = await Product.find({ category, isActive: true })
        .limit(6)
        .sort({ rating: -1 });

      const categoryNames = {
        men: 'পুরুষদের',
        women: 'মহিলাদের', 
        kids: 'বাচ্চাদের'
      };

      return {
        products,
        message: `${categoryNames[category]} জন্য ${products.length}টি পণ্য দেখুন:`,
        suggestions: [`${category} traditional`, `${category} casual`, `${category} formal`]
      };
    }

    return {
      products: [],
      message: "কোন ক্যাটাগরি খুঁজছেন? পুরুষ, মহিলা নাকি বাচ্চাদের পোশাক?",
      suggestions: ["Men's fashion", "Women's fashion", "Kids collection"]
    };

  } catch (error) {
    console.error('Category query error:', error);
    return {
      products: [],
      message: "ক্যাটাগরি অনুযায়ী পণ্য খুঁজতে সমস্যা হয়েছে।",
      suggestions: ["Try again", "Browse all products"]
    };
  }
}

async function getRecommendations(preferences) {
  try {
    const filter = { isActive: true };

    if (preferences.category) {
      filter.category = preferences.category;
    }

    if (preferences.budget) {
      filter.price = {
        $gte: preferences.budget.min || 0,
        $lte: preferences.budget.max || 10000
      };
    }

    if (preferences.occasion) {
      filter.occasion = { $in: [preferences.occasion] };
    }

    if (preferences.colors && preferences.colors.length > 0) {
      filter.colors = { $in: preferences.colors };
    }

    const products = await Product.find(filter)
      .limit(8)
      .sort({ rating: -1, reviews: -1 });

    return products;
  } catch (error) {
    console.error('Recommendations error:', error);
    return [];
  }
}

module.exports = router;