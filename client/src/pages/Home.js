import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShoppingBag, Camera, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const { state, dispatch } = useAppContext();

  const featuredProducts = state.products.slice(0, 8);
  const categories = [
    {
      name: 'Men\'s Fashion',
      category: 'men',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
      description: 'Traditional panjabis, kurtas & modern wear',
      count: state.products.filter(p => p.category === 'men').length
    },
    {
      name: 'Women\'s Fashion',
      category: 'women',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
      description: 'Elegant sarees, salwar kameez & contemporary styles',
      count: state.products.filter(p => p.category === 'women').length
    },
    {
      name: 'Kids Collection',
      category: 'kids',
      image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
      description: 'Comfortable & stylish clothing for children',
      count: state.products.filter(p => p.category === 'kids').length
    }
  ];

  const handleCategoryClick = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white overflow-hidden">
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
                <span className="block text-2xl lg:text-3xl text-purple-200 font-normal mt-2 bengali-text">
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
                  onClick={() => dispatch({ type: 'TOGGLE_CHATBOT' })}
                  className="bg-white text-purple-800 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Chat with AI Assistant</span>
                </button>
                
                <button
                  onClick={() => dispatch({ type: 'TOGGLE_VIRTUAL_TRYON' })}
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
                <div className="text-3xl font-bold text-yellow-400 mb-1">{state.products.length}+</div>
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
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our extensive collection of authentic Bangladeshi fashion for every member of your family
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.category}
                to={`/products/${category.category}`}
                onClick={() => handleCategoryClick(category.category)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden card-hover"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90 mb-2">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-75">{category.count} items</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked collection of our most popular and trending fashion items
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <div key={product._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden card-hover">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">{product.name}</h3>
                    {product.namebn && (
                      <p className="text-sm text-gray-500 mb-2 bengali-text">{product.namebn}</p>
                    )}
                    
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-purple-600">৳{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">৳{product.originalPrice}</span>
                      )}
                    </div>
                    
                    <Link
                      to={`/product/${product._id}`}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="text-gray-600">Loading featured products...</p>
            </div>
          )}

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose GenAI Fashion?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of fashion shopping with our cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Assistant</h3>
              <p className="text-gray-600">Get personalized recommendations based on your style preferences and budget</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Virtual Try-On</h3>
              <p className="text-gray-600">See how clothes look on you before buying with our advanced AR technology</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Authentic Collection</h3>
              <p className="text-gray-600">Curated selection of traditional and modern Bangladeshi fashion</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Free delivery across Bangladesh within 2-3 business days</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;