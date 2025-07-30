import React, { useState, useRef, useEffect } from 'react';
import { Send, X, RotateCcw, ShoppingCart, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { aiChatbot } from '../services/aiChatbot';
import { ChatMessage } from '../types';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useAppContext();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });
    setInputMessage('');
    setIsTyping(true);

    try {
      const { response, products } = await aiChatbot.processMessage(inputMessage);

      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: response,
          isBot: true,
          timestamp: new Date(),
          products: products
        };

        dispatch({ type: 'ADD_CHAT_MESSAGE', payload: botMessage });
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); // Simulate thinking time
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: 'দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।',
        isBot: true,
        timestamp: new Date()
      };
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: errorMessage });
      setIsTyping(false);
    }
  };

  const handleQuickResponse = (message: string) => {
    setInputMessage(message);
  };

  const handleAddToCart = (product: any) => {
    const cartItem = {
      product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0]
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    
    const confirmMessage: ChatMessage = {
      id: Date.now().toString(),
      text: `✅ "${product.name}" আপনার কার্টে যোগ করা হয়েছে!`,
      isBot: true,
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: confirmMessage });
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
    aiChatbot.clearContext();
  };

  const quickQuestions = [
    "Show me red sarees under 3000 tk",
    "পুরুষদের পাঞ্জাবি দেখান",
    "Kids t-shirts for school",
    "Wedding collection for women",
    "Casual shirts for office"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-end p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[600px] flex flex-col">
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
              onClick={clearChat}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Clear Chat"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {state.chatMessages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Welcome to AI Fashion Assistant!</h4>
              <p className="text-sm text-gray-600 mb-4">আমি আপনাকে সেরা ফ্যাশন পণ্য খুঁজে দিতে সাহায্য করব</p>
              
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium">Quick Questions:</p>
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(question)}
                    className="block w-full text-left text-xs bg-gray-50 hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {state.chatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] ${message.isBot ? 'bg-gray-100' : 'bg-purple-600 text-white'} rounded-2xl p-3`}>
                <p className="text-sm">{message.text}</p>
                
                {message.products && message.products.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.products.map((product) => (
                      <div key={product.id} className="bg-white rounded-lg p-3 border">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-800 text-sm">{product.name}</h5>
                            <p className="text-purple-600 font-semibold text-sm">৳{product.price}</p>
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
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

        {/* Quick Actions */}
        {state.chatMessages.length > 0 && (
          <div className="px-4 py-2 border-t">
            <div className="flex flex-wrap gap-1">
              {quickQuestions.slice(3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(question)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message... (e.g., 'Show me red sarees')"
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
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