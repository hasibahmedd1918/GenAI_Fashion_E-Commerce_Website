import React from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">GenAI Fashion</h3>
                <p className="text-sm text-gray-400">Smart Fashion Store</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Bangladesh's first AI-powered fashion e-commerce platform offering 
              authentic traditional and modern clothing with virtual try-on technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Men's Fashion</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Women's Fashion</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Kids Collection</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Traditional Wear</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-gray-300">+880 1711-123456</p>
                  <p className="text-sm text-gray-400">Customer Support</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-gray-300">support@genaifashion.com</p>
                  <p className="text-sm text-gray-400">Email Support</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-gray-300">Dhaka, Bangladesh</p>
                  <p className="text-sm text-gray-400">Head Office</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">
                © 2024 GenAI Fashion. All rights reserved. Made with ❤️ for Bangladesh.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-3">We Accept</p>
            <div className="flex justify-center items-center space-x-4">
              <div className="bg-white text-gray-800 px-3 py-1 rounded text-sm font-semibold">bKash</div>
              <div className="bg-white text-gray-800 px-3 py-1 rounded text-sm font-semibold">Nagad</div>
              <div className="bg-white text-gray-800 px-3 py-1 rounded text-sm font-semibold">Rocket</div>
              <div className="bg-white text-gray-800 px-3 py-1 rounded text-sm font-semibold">Cash on Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;