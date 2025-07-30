import React from 'react';
import { Sparkles, ShoppingBag, Camera, MessageCircle } from 'lucide-react';

interface HeroProps {
  onChatToggle: () => void;
  onTryOnToggle: () => void;
}

const Hero: React.FC<HeroProps> = ({ onChatToggle, onTryOnToggle }) => {
  return (
    <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-yellow-400" />
              <span className="text-lg font-semibold text-yellow-400">AI-Powered Fashion</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              GenAI Fashion
              <span className="block text-2xl lg:text-3xl text-purple-200 font-normal mt-2">
                বাংলাদেশের স্মার্ট ফ্যাশন স্টোর
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-purple-100 mb-8 max-w-2xl leading-relaxed">
              Experience the future of fashion shopping with AI-powered recommendations, 
              virtual try-on technology, and authentic Bangladeshi clothing collections.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-sm text-purple-200">Smart product recommendations</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Virtual Try-On</h3>
                  <p className="text-sm text-purple-200">See how clothes look on you</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Authentic Collection</h3>
                  <p className="text-sm text-purple-200">Traditional & modern styles</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold">🚚</span>
                </div>
                <div>
                  <h3 className="font-semibold">Free Delivery</h3>
                  <p className="text-sm text-purple-200">All over Bangladesh</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onChatToggle}
                className="bg-white text-purple-800 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat with AI Assistant</span>
              </button>
              
              <button
                onClick={onTryOnToggle}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-800 transition-all flex items-center justify-center space-x-2"
              >
                <Camera className="h-5 w-5" />
                <span>Virtual Try-On</span>
              </button>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg"
                  alt="Fashion Model"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 -left-4 lg:left-8 z-20">
                <div className="bg-white text-purple-800 p-3 rounded-lg shadow-lg transform -rotate-6">
                  <p className="text-sm font-semibold">৳2,500</p>
                  <p className="text-xs">Premium Saree</p>
                </div>
              </div>

              <div className="absolute bottom-8 -right-4 lg:right-8 z-20">
                <div className="bg-green-500 text-white p-3 rounded-lg shadow-lg transform rotate-6">
                  <p className="text-sm font-semibold">Free Delivery</p>
                  <p className="text-xs">2-3 Days</p>
                </div>
              </div>

              <div className="absolute top-1/2 -left-8 lg:-left-4 z-20">
                <div className="bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg animate-bounce">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl transform rotate-6 scale-105 opacity-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative border-t border-purple-700 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">50+</div>
              <div className="text-sm text-purple-200">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">100%</div>
              <div className="text-sm text-purple-200">AI-Powered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">24/7</div>
              <div className="text-sm text-purple-200">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-1">Free</div>
              <div className="text-sm text-purple-200">Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;