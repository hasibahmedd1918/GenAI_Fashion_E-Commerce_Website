import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, MessageCircle, Camera } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: searchQuery });
      navigate('/products');
    }
  };

  const handleCategorySelect = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
    navigate('/products');
    setIsMenuOpen(false);
  };

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">GenAI Fashion</h1>
              <p className="text-xs text-gray-500">Bangladesh's Smart Fashion</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Home
              </Link>
              <button
                onClick={() => handleCategorySelect('all')}
                className={`text-sm font-medium transition-colors ${
                  state.selectedCategory === 'all' && isActive('/products')
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => handleCategorySelect('men')}
                className={`text-sm font-medium transition-colors ${
                  state.selectedCategory === 'men' && isActive('/products')
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Men's
              </button>
              <button
                onClick={() => handleCategorySelect('women')}
                className={`text-sm font-medium transition-colors ${
                  state.selectedCategory === 'women' && isActive('/products')
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Women's
              </button>
              <button
                onClick={() => handleCategorySelect('kids')}
                className={`text-sm font-medium transition-colors ${
                  state.selectedCategory === 'kids' && isActive('/products')
                    ? 'text-purple-600' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Kids
              </button>
            </nav>

            {/* Action Buttons */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CHATBOT' })}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              title="AI Assistant"
            >
              <div className="relative">
                <MessageCircle className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </button>

            <button
              onClick={() => dispatch({ type: 'TOGGLE_VIRTUAL_TRYON' })}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
              title="Virtual Try-On"
            >
              <Camera className="h-6 w-6" />
            </button>

            <Link
              to="/cart"
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors relative"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {state.isAuthenticated ? (
              <Link
                to="/profile"
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                title={state.user?.name || 'Profile'}
              >
                <User className="h-6 w-6" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Login
              </Link>
            )}

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  isActive('/') 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>
              <button
                onClick={() => handleCategorySelect('all')}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  state.selectedCategory === 'all' && isActive('/products')
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => handleCategorySelect('men')}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  state.selectedCategory === 'men' && isActive('/products')
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Men's Fashion
              </button>
              <button
                onClick={() => handleCategorySelect('women')}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  state.selectedCategory === 'women' && isActive('/products')
                    ? 'bg-purple-100 text-purple-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Women's Fashion
              </button>
              <button
                onClick={() => handleCategorySelect('kids')}
                className={`text-left py-2 px-4 rounded-lg transition-colors ${
                  state.selectedCategory === 'kids' && isActive('/products')
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