import React, { useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { allProducts } from '../data/products';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductGridProps {
  onTryOn: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onTryOn }) => {
  const { state } = useAppContext();

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === state.selectedCategory);
    }

    // Filter by search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(product => {
        const searchText = `${product.name} ${product.namebn || ''} ${product.description} ${product.subcategory}`.toLowerCase();
        return searchText.includes(query) || 
               product.colors.some(color => color.toLowerCase().includes(query)) ||
               product.occasion?.some(occ => occ.toLowerCase().includes(query));
      });
    }

    return filtered;
  }, [state.selectedCategory, state.searchQuery]);

  const getCategoryTitle = () => {
    switch (state.selectedCategory) {
      case 'men': return "Men's Fashion";
      case 'women': return "Women's Fashion";
      case 'kids': return "Kids Fashion";
      default: return "All Products";
    }
  };

  const getCategoryDescription = () => {
    switch (state.selectedCategory) {
      case 'men': return "Discover traditional panjabis, kurtas, and modern casual wear for Bengali men";
      case 'women': return "Elegant sarees, salwar kameez, and contemporary fashion for Bangladeshi women";
      case 'kids': return "Comfortable and stylish clothing for children of all ages";
      default: return "Explore our complete collection of authentic Bangladeshi fashion";
    }
  };

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{getCategoryTitle()}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{getCategoryDescription()}</p>
        {state.searchQuery && (
          <div className="mt-4">
            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              Search results for: "{state.searchQuery}"
            </span>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </p>
        
        {/* Filter indicators */}
        <div className="flex items-center space-x-2">
          {state.selectedCategory !== 'all' && (
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {state.selectedCategory}
            </span>
          )}
          {state.searchQuery && (
            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              Search: {state.searchQuery}
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onTryOn={onTryOn}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            {state.searchQuery 
              ? `No products match your search "${state.searchQuery}"`
              : "No products available in this category"
            }
          </p>
          <button
            onClick={() => {
              if (state.searchQuery) {
                state.dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
              }
              state.dispatch({ type: 'SET_CATEGORY', payload: 'all' });
            }}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Category Highlights */}
      {!state.searchQuery && state.selectedCategory === 'all' && (
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Shop by Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                category: 'men',
                title: "Men's Collection",
                subtitle: "Traditional & Modern",
                image: allProducts.find(p => p.category === 'men')?.image,
                count: allProducts.filter(p => p.category === 'men').length
              },
              {
                category: 'women',
                title: "Women's Collection", 
                subtitle: "Elegant & Stylish",
                image: allProducts.find(p => p.category === 'women')?.image,
                count: allProducts.filter(p => p.category === 'women').length
              },
              {
                category: 'kids',
                title: "Kids Collection",
                subtitle: "Comfortable & Fun",
                image: allProducts.find(p => p.category === 'kids')?.image,
                count: allProducts.filter(p => p.category === 'kids').length
              }
            ].map((cat) => (
              <button
                key={cat.category}
                onClick={() => state.dispatch({ type: 'SET_CATEGORY', payload: cat.category as any })}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-12">
                  <img 
                    src={cat.image} 
                    alt={cat.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h4 className="text-lg font-semibold">{cat.title}</h4>
                  <p className="text-sm opacity-90">{cat.subtitle}</p>
                  <p className="text-xs opacity-75">{cat.count} items</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;