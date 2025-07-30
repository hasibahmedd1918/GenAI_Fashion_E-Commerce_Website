import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ChatBot from './components/ChatBot';
import VirtualTryOn from './components/VirtualTryOn';
import Auth from './components/Auth';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { Product } from './types';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleTryOnProduct = (product: Product) => {
    // This would set the selected product for try-on
    setIsTryOnOpen(true);
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header
          onChatToggle={() => setIsChatOpen(!isChatOpen)}
          onAuthToggle={() => setIsAuthOpen(!isAuthOpen)}
          onCartToggle={() => setIsCartOpen(!isCartOpen)}
        />
        
        <Hero
          onChatToggle={() => setIsChatOpen(true)}
          onTryOnToggle={() => setIsTryOnOpen(true)}
        />
        
        <main>
          <ProductGrid onTryOn={handleTryOnProduct} />
        </main>
        
        <Footer />

        {/* Modals */}
        <ChatBot 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
        />
        
        <VirtualTryOn 
          isOpen={isTryOnOpen} 
          onClose={() => setIsTryOnOpen(false)} 
        />
        
        <Auth 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
        />
        
        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      </div>
    </AppProvider>
  );
}

export default App;