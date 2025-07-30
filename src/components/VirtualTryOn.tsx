import React, { useState, useRef } from 'react';
import { Camera, Upload, X, RotateCcw, Download } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';

interface VirtualTryOnProps {
  isOpen: boolean;
  onClose: () => void;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useAppContext();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [useDefaultModel, setUseDefaultModel] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default model images for different categories
  const defaultModels = {
    men: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    women: 'https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg',
    kids: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg'
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserPhoto(e.target?.result as string);
        setUseDefaultModel(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUseDefaultModel = (category: 'men' | 'women' | 'kids') => {
    setUserPhoto(defaultModels[category]);
    setUseDefaultModel(true);
  };

  const handleTryOn = async () => {
    if (!selectedProduct || !userPhoto) return;

    setIsProcessing(true);

    // Simulate AI processing time
    setTimeout(() => {
      setIsProcessing(false);
      // In a real implementation, this would send the image and product to an AI service
      dispatch({
        type: 'SET_VIRTUAL_TRY_ON',
        payload: {
          isActive: true,
          selectedProduct,
          userPhoto
        }
      });
    }, 2000);
  };

  const resetTryOn = () => {
    setSelectedProduct(null);
    setUserPhoto(null);
    setUseDefaultModel(false);
    setIsProcessing(false);
    dispatch({
      type: 'SET_VIRTUAL_TRY_ON',
      payload: { isActive: false, selectedProduct: null, userPhoto: null }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
          <div>
            <h3 className="text-white text-xl font-semibold">Virtual Trial Room</h3>
            <p className="text-white text-sm opacity-90">Try on clothes virtually with AI</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={resetTryOn}
              className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Reset"
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

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Controls */}
          <div className="w-1/3 bg-gray-50 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Photo Upload Section */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Step 1: Choose Your Photo</h4>
                
                {!userPhoto ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center space-x-2 bg-white border-2 border-dashed border-gray-300 hover:border-purple-400 p-4 rounded-lg transition-colors"
                    >
                      <Upload className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600">Upload Your Photo</span>
                    </button>
                    
                    <div className="text-center text-sm text-gray-500">or</div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Use Default Models:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(defaultModels).map(([category, image]) => (
                          <button
                            key={category}
                            onClick={() => handleUseDefaultModel(category as 'men' | 'women' | 'kids')}
                            className="relative group"
                          >
                            <img 
                              src={image} 
                              alt={category}
                              className="w-full h-20 object-cover rounded-lg group-hover:ring-2 group-hover:ring-purple-400"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-medium capitalize">{category}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={userPhoto} 
                      alt="User photo"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setUserPhoto(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Product Selection */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Step 2: Select Product</h4>
                
                {!selectedProduct ? (
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">Browse and select a product from the main store to try on</p>
                    <button
                      onClick={onClose}
                      className="text-purple-600 text-sm font-medium hover:underline"
                    >
                      Go to Product Catalog →
                    </button>
                  </div>
                ) : (
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">{selectedProduct.name}</h5>
                        <p className="text-purple-600 font-semibold">৳{selectedProduct.price}</p>
                      </div>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Try On Button */}
              {userPhoto && selectedProduct && (
                <button
                  onClick={handleTryOn}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Try It On!'
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Panel - Try On Result */}
          <div className="flex-1 bg-gray-100 p-6 flex items-center justify-center">
            {!userPhoto ? (
              <div className="text-center">
                <Camera className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Virtual Try-On Preview</h3>
                <p className="text-gray-500">Upload your photo or choose a model to get started</p>
              </div>
            ) : !selectedProduct ? (
              <div className="text-center">
                <img 
                  src={userPhoto} 
                  alt="User"
                  className="max-w-sm max-h-96 object-contain rounded-lg shadow-lg mb-4"
                />
                <p className="text-gray-600">Select a product to try on</p>
              </div>
            ) : isProcessing ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">AI Processing...</h3>
                <p className="text-gray-500">Creating your virtual try-on experience</p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="relative">
                  <img 
                    src={userPhoto} 
                    alt="Virtual try-on result"
                    className="max-w-sm max-h-96 object-contain rounded-lg shadow-lg"
                  />
                  {/* Simulated overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600 to-transparent opacity-20 rounded-lg"></div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-purple-600">Virtual Try-On Active</span>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => {/* Implement download functionality */}}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Save Result</span>
                  </button>
                  <button
                    onClick={resetTryOn}
                    className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Try Another</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;