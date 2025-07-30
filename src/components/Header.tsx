import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface HeaderProps {
  onChatToggle: () => void;
  onAuthToggle: () => void;
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onChatToggle, onAuthToggle, onCartToggle }) => {
  const { state, dispatch } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const handleCategorySelect = (category: 'all' | 'men' | 'women' | 'kids') => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
    setIsMenuOpen(false);
  };

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">GenAI Fashion</h1>
              <p className="text-xs text-gray-500">Bangladesh's Smart Fashion</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="Search for sarees, panjabis, dresses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              <button
                onClick={() => handleCategorySelect('all')}
                className={`text-sm font-medium transition-colors ${
                  state.selectedCategory === 'all' 
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => handleCategorySelect('men')}
                className={`text-sm font-medium transition-colors ${
                  state.selectedCategory === 'men' 
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Men's
              </button>
              <button
                onClick={() => handleCategorySelect('women')}
                className={`text-sm font-medium transition-colors ${
                  state.selectedCategory === 'women' 
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Women's
              </button>
              <button
                onClick={() => handleCategorySelect('kids')}
                className={`text-sm font-medium transition-colors ${
                  state.selectedCategory === 'kids' 
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Kids
              </button>
            </nav>

            {/* Action Buttons */}
            <button
              onClick={onChatToggle}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              title="AI Assistant"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </button>

            <button
              onClick={onCartToggle}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors relative"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={onAuthToggle}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              title={state.user ? state.user.name : 'Login'}
            >
              <User className="h-6 w-6" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-3 border-t">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search fashion items..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <button
                onClick={() => handleCategorySelect('all')}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  state.selectedCategory === 'all' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => handleCategorySelect('men')}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  state.selectedCategory === 'men' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Men's Fashion
              </button>
              <button
                onClick={() => handleCategorySelect('women')}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  state.selectedCategory === 'women' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Women's Fashion
              </button>
              <button
                onClick={() => handleCategorySelect('kids')}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  state.selectedCategory === 'kids' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Kids Fashion
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;