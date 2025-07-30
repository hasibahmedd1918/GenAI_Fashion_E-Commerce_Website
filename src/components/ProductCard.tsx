import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Eye, Camera } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  onTryOn?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onTryOn }) => {
  const { dispatch } = useAppContext();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    const cartItem = {
      product,
      quantity: 1,
      selectedSize,
      selectedColor
    };
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{discountPercentage}%
            </span>
          )}
          {product.isTraditional && (
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Traditional
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className={`absolute top-3 right-3 space-y-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>
          <button className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all">
            <Eye className="h-4 w-4 text-gray-600 hover:text-purple-500" />
          </button>
          {onTryOn && (
            <button 
              onClick={() => onTryOn(product)}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
            >
              <Camera className="h-4 w-4 text-gray-600 hover:text-green-500" />
            </button>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Bengali Name */}
        <div className="mb-2">
          <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
          {product.namebn && (
            <p className="text-sm text-gray-500 mt-1">{product.namebn}</p>
          )}
        </div>

        {/* Rating */}
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

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold text-purple-600">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">৳{product.originalPrice}</span>
          )}
        </div>

        {/* Color Selection */}
        {product.colors.length > 1 && (
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-1">Colors:</p>
            <div className="flex space-x-1">
              {product.colors.slice(0, 4).map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColor === color 
                      ? 'border-purple-500 scale-110' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ 
                    backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                   color.toLowerCase() === 'black' ? '#000000' :
                                   color.toLowerCase() === 'red' ? '#ef4444' :
                                   color.toLowerCase() === 'blue' ? '#3b82f6' :
                                   color.toLowerCase() === 'green' ? '#10b981' :
                                   color.toLowerCase() === 'yellow' ? '#f59e0b' :
                                   color.toLowerCase() === 'pink' ? '#ec4899' :
                                   color.toLowerCase() === 'purple' ? '#8b5cf6' :
                                   color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray' ? '#6b7280' :
                                   color.toLowerCase() === 'maroon' ? '#7f1d1d' :
                                   color.toLowerCase() === 'golden' ? '#f59e0b' :
                                   color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                   color.toLowerCase() === 'cream' ? '#fef3c7' :
                                   '#9ca3af'
                  }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500 self-center">+{product.colors.length - 4}</span>
              )}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes.length > 1 && (
          <div className="mb-4">
            <p className="text-xs text-gray-600 mb-1">Size:</p>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-1 text-xs border rounded transition-all ${
                    selectedSize === size 
                      ? 'border-purple-500 bg-purple-50 text-purple-600' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;