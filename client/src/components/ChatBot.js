import React, { useState, useRef, useEffect } from 'react';
import { Send, X, RotateCcw, ShoppingCart, Sparkles, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { chatAPI } from '../services/api';

const ChatBot = () => {
  const { state, dispatch } = useAppContext();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatBot.messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (state.chatBot.messages.length === 0) {
      const welcomeMessage = {
        id: Date.now().toString(),
        text: "আসসালামু আলাইকুম! GenAI Fashion এ আপনাকে স্বাগতম। আমি আপনার ব্যক্তিগত ফ্যাশন সহায়ক। আপনি কোন ধরনের পোশাক খুঁজছেন?",
        isBot: true,
        timestamp: new Date(),
        suggestions: [
          "Show me red sarees under 3000 tk",
          "পুরুষদের পাঞ্জাবি দেখান",
          "Kids t-shirts for school",
          "Wedding collection for women",
          "What's trending now?"
        ]
      };
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: welcomeMessage });
    }
  }, [state.chatBot.isOpen]);

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });
    setInputMessage('');
    dispatch({ type: 'SET_CHAT_TYPING', payload: true });

    try {
      // Simulate AI processing with local logic for demo
      const response = await processMessageLocally(messageText);
      
      setTimeout(() => {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          text: response.text,
          isBot: true,
          timestamp: new Date(),
          products: response.products,
          suggestions: response.suggestions
        };

        dispatch({ type: 'ADD_CHAT_MESSAGE', payload: botMessage });
        dispatch({ type: 'SET_CHAT_TYPING', payload: false });
      }, 1000 + Math.random() * 1000);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।',
        isBot: true,
        timestamp: new Date()
      };
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: errorMessage });
      dispatch({ type: 'SET_CHAT_TYPING', payload: false });
    }
  };

  const processMessageLocally = async (message) => {
    const lowerMessage = message.toLowerCase();
    let response = { text: '', products: [], suggestions: [] };

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('আসসালামু আলাইকুম')) {
      response.text = "আসসালামু আলাইকুম! আমি আপনাকে সাহায্য করতে এখানে আছি। আপনি কী খুঁজছেন?";
      response.suggestions = [
        "Show me latest arrivals",
        "Men's traditional wear",
        "Women's party collection",
        "Kids casual wear"
      ];
    }
    // Product search
    else if (lowerMessage.includes('saree') || lowerMessage.includes('শাড়ি')) {
      const sarees = state.products.filter(p => 
        p.name.toLowerCase().includes('saree') || 
        p.subcategory === 'traditional' && p.category === 'women'
      ).slice(0, 4);
      
      response.text = `আপনার জন্য ${sarees.length}টি সুন্দর শাড়ি খুঁজে পেয়েছি! দেখুন এগুলো:`;
      response.products = sarees;
      response.suggestions = ["Show more sarees", "Party wear sarees", "Wedding sarees"];
    }
    else if (lowerMessage.includes('panjabi') || lowerMessage.includes('পাঞ্জাবি')) {
      const panjabis = state.products.filter(p => 
        p.name.toLowerCase().includes('panjabi') || 
        p.name.toLowerCase().includes('kurta') ||
        (p.subcategory === 'traditional' && p.category === 'men')
      ).slice(0, 4);
      
      response.text = `পুরুষদের জন্য ${panjabis.length}টি চমৎকার পাঞ্জাবি আছে:`;
      response.products = panjabis;
      response.suggestions = ["Eid collection", "Wedding panjabis", "Casual kurtas"];
    }
    else if (lowerMessage.includes('kids') || lowerMessage.includes('children') || lowerMessage.includes('বাচ্চা')) {
      const kidsItems = state.products.filter(p => p.category === 'kids').slice(0, 4);
      
      response.text = `বাচ্চাদের জন্য ${kidsItems.length}টি সুন্দর পোশাক দেখুন:`;
      response.products = kidsItems;
      response.suggestions = ["School uniforms", "Party wear for kids", "Casual kids wear"];
    }
    // Price-based search
    else if (lowerMessage.includes('under') && lowerMessage.includes('tk')) {
      const priceMatch = lowerMessage.match(/under (\d+)/);
      if (priceMatch) {
        const maxPrice = parseInt(priceMatch[1]);
        const affordableItems = state.products.filter(p => p.price <= maxPrice).slice(0, 4);
        
        response.text = `${maxPrice} টাকার নিচে ${affordableItems.length}টি পণ্য পেয়েছি:`;
        response.products = affordableItems;
        response.suggestions = [`Under ${maxPrice + 500} tk`, "Best deals", "Sale items"];
      }
    }
    // General product search
    else if (lowerMessage.includes('show') || lowerMessage.includes('find') || lowerMessage.includes('দেখাও')) {
      const randomProducts = state.products.sort(() => 0.5 - Math.random()).slice(0, 4);
      response.text = "এই পণ্যগুলো দেখুন, আপনার পছন্দ হতে পারে:";
      response.products = randomProducts;
      response.suggestions = ["More like these", "Different category", "Price range"];
    }
    // FAQ responses
    else if (lowerMessage.includes('delivery') || lowerMessage.includes('ডেলিভারি')) {
      response.text = "আমরা সারা বাংলাদেশে ২-৩ দিনের মধ্যে ডেলিভারি দিয়ে থাকি। ঢাকার ভিতরে হোম ডেলিভারি ফ্রি! 🚚";
      response.suggestions = ["Return policy", "Payment methods", "Track order"];
    }
    else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('দাম')) {
      response.text = "আমাদের পণ্যের দাম ৩৮০ টাকা থেকে ৮৫০০ টাকা পর্যন্ত। আপনার বাজেট কত?";
      response.suggestions = ["Under 1000 tk", "Under 2000 tk", "Under 5000 tk"];
    }
    else if (lowerMessage.includes('size') || lowerMessage.includes('সাইজ')) {
      response.text = "আমাদের সাইজ গাইড: S (36\"), M (38\"), L (40\"), XL (42\"), XXL (44\")। আপনার বুকের মাপ অনুযায়ী সাইজ বেছে নিন।";
      response.suggestions = ["Size chart", "How to measure", "Exchange policy"];
    }
    // Default response
    else {
      const trendingProducts = state.products.slice(0, 4);
      response.text = "আমি আপনাকে সাহায্য করতে চাই! এই ট্রেন্ডিং পণ্যগুলো দেখুন অথবা আরো নির্দিষ্ট করে বলুন আপনি কী খুঁজছেন।";
      response.products = trendingProducts;
      response.suggestions = [
        "Latest arrivals",
        "Best sellers",
        "Traditional wear",
        "Modern fashion"
      ];
    }

    return response;
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      id: `${product._id}-${Date.now()}`,
      product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0]
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    
    const confirmMessage = {
      id: Date.now().toString(),
      text: `✅ "${product.name}" আপনার কার্টে যোগ করা হয়েছে!`,
      isBot: true,
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: confirmMessage });
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
  };

  const refreshChat = () => {
    clearChat();
    const welcomeMessage = {
      id: Date.now().toString(),
      text: "চ্যাট রিফ্রেশ হয়েছে! আবার শুরু করি। আপনি কী খুঁজছেন?",
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        "Show me red sarees under 3000 tk",
        "পুরুষদের পাঞ্জাবি দেখান",
        "Kids t-shirts for school",
        "Wedding collection for women"
      ]
    };
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: welcomeMessage });
  };

  if (!state.chatBot.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Fashion Assistant</h3>
              <p className="text-white text-sm opacity-90">আমি আপনাকে সাহায্য করতে এখানে আছি</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={refreshChat}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Refresh Chat"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            <button
              onClick={clearChat}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Clear Chat"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CHATBOT' })}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {state.chatBot.messages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] ${message.isBot ? 'bg-gray-100' : 'bg-purple-600 text-white'} rounded-2xl p-3`}>
                <p className="text-sm">{message.text}</p>
                
                {/* Product Cards */}
                {message.products && message.products.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.products.map((product) => (
                      <div key={product._id} className="bg-white rounded-lg p-3 border">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-800 text-sm line-clamp-2">{product.name}</h5>
                            {product.namebn && (
                              <p className="text-xs text-gray-500 bengali-text">{product.namebn}</p>
                            )}
                            <p className="text-purple-600 font-semibold text-sm">৳{product.price}</p>
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-2 py-1 rounded-lg transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {state.chatBot.isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl p-3 max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Navigation Options */}
        <div className="px-4 py-2 border-t bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CHATBOT' })}
              className="flex items-center space-x-1 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Shop</span>
            </button>
            <div className="flex space-x-2">
              <button
                onClick={refreshChat}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Refresh
              </button>
              <button
                onClick={clearChat}
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message... (e.g., 'Show me red sarees')"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              disabled={state.chatBot.isTyping}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || state.chatBot.isTyping}
              className="bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;