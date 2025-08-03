import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatBot from './components/ChatBot';
import VirtualTryOn from './components/VirtualTryOn';
import { useAppContext } from './context/AppContext';

function App() {
  const { state } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Modals */}
      {state.chatBot.isOpen && <ChatBot />}
      {state.virtualTryOn.isOpen && <VirtualTryOn />}
    </div>
  );
}

export default App;