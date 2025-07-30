import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useAppContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (productId: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      const itemKey = `${productId}-${size}-${color}`;
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemKey });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity: newQuantity } });
    }
  };

  const removeItem = (productId: string, size: string, color: string) => {
    const itemKey = `${productId}-${size}-${color}`;
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemKey });
  };

  const getTotalPrice = () => {
    return state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (!state.user) {
      alert('Please login first to proceed with checkout');
      return;
    }

    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      alert('Order placed successfully! 🎉\n\nOrder Details:\n' + 
            `Items: ${getTotalItems()}\n` +
            `Total: ৳${getTotalPrice()}\n\n` +
            'You will receive a confirmation call within 30 minutes.\n' +
            'Delivery time: 2-3 business days');
      
      dispatch({ type: 'CLEAR_CART' });
      setIsCheckingOut(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
      <div className="bg-white h-full w-full max-w-md flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
          <div>
            <h3 className="text-white text-xl font-semibold">Shopping Cart</h3>
            <p className="text-white text-sm opacity-90">
              {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in cart
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {state.cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-24 w-24 text-gray-300 mb-4" />
              <h4 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h4>
              <p className="text-gray-500 mb-6">Add some products to get started</p>
              <button
                onClick={onClose}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {state.cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} 
                     className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 line-clamp-2">
                        {item.product.name}
                      </h4>
                      {item.product.namebn && (
                        <p className="text-sm text-gray-500">{item.product.namebn}</p>
                      )}
                      
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-600">
                          Size: <span className="font-medium">{item.selectedSize}</span>
                        </span>
                        <span className="text-sm text-gray-600">
                          Color: <span className="font-medium">{item.selectedColor}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(
                              item.product.id, 
                              item.selectedSize, 
                              item.selectedColor, 
                              item.quantity - 1
                            )}
                            className="p-1 text-gray-500 hover:text-gray-700 border border-gray-300 rounded"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1 bg-white border border-gray-300 rounded min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(
                              item.product.id, 
                              item.selectedSize, 
                              item.selectedColor, 
                              item.quantity + 1
                            )}
                            className="p-1 text-gray-500 hover:text-gray-700 border border-gray-300 rounded"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-purple-600">
                            ৳{item.product.price * item.quantity}
                          </span>
                          <button
                            onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Checkout Section */}
        {state.cart.length > 0 && (
          <div className="border-t bg-white p-4 space-y-4">
            {/* Price Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
                <span className="font-medium">৳{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-lg text-purple-600">৳{getTotalPrice()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Proceed to Checkout - ৳${getTotalPrice()}`
              )}
            </button>

            {/* Security Note */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                🔒 Secure checkout • Free delivery all over Bangladesh
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;