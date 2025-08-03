import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../services/api';
import Cookies from 'js-cookie';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  cart: [],
  products: [],
  categories: ['men', 'women', 'kids'],
  selectedCategory: 'all',
  searchQuery: '',
  loading: false,
  error: null,
  chatBot: {
    isOpen: false,
    messages: [],
    isTyping: false
  },
  virtualTryOn: {
    isOpen: false,
    selectedProduct: null,
    userPhoto: null,
    result: null
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload 
      };
    
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false,
        cart: []
      };
    
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(
        item => item.product._id === action.payload.product._id &&
                item.selectedSize === action.payload.selectedSize &&
                item.selectedColor === action.payload.selectedColor
      );
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product._id === action.payload.product._id &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColor === action.payload.selectedColor
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      
      return { ...state, cart: [...state.cart, action.payload] };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'TOGGLE_CHATBOT':
      return {
        ...state,
        chatBot: { ...state.chatBot, isOpen: !state.chatBot.isOpen }
      };
    
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatBot: {
          ...state.chatBot,
          messages: [...state.chatBot.messages, action.payload]
        }
      };
    
    case 'SET_CHAT_TYPING':
      return {
        ...state,
        chatBot: { ...state.chatBot, isTyping: action.payload }
      };
    
    case 'CLEAR_CHAT':
      return {
        ...state,
        chatBot: { ...state.chatBot, messages: [] }
      };
    
    case 'TOGGLE_VIRTUAL_TRYON':
      return {
        ...state,
        virtualTryOn: { ...state.virtualTryOn, isOpen: !state.virtualTryOn.isOpen }
      };
    
    case 'SET_VIRTUAL_TRYON_PRODUCT':
      return {
        ...state,
        virtualTryOn: { ...state.virtualTryOn, selectedProduct: action.payload }
      };
    
    case 'SET_VIRTUAL_TRYON_PHOTO':
      return {
        ...state,
        virtualTryOn: { ...state.virtualTryOn, userPhoto: action.payload }
      };
    
    case 'SET_VIRTUAL_TRYON_RESULT':
      return {
        ...state,
        virtualTryOn: { ...state.virtualTryOn, result: action.payload }
      };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user from token on app start
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify token and get user data
      api.get('/auth/me')
        .then(response => {
          dispatch({ type: 'SET_USER', payload: response.data.user });
        })
        .catch(() => {
          Cookies.remove('token');
          delete api.defaults.headers.common['Authorization'];
        });
    }
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('genai-fashion-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        cartItems.forEach(item => {
          dispatch({ type: 'ADD_TO_CART', payload: item });
        });
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('genai-fashion-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Load products on app start
  useEffect(() => {
    const loadProducts = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await api.get('/products');
        dispatch({ type: 'SET_PRODUCTS', payload: response.data.products });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load products' });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadProducts();
  }, []);

  const value = {
    state,
    dispatch,
    // Helper functions
    login: async (credentials) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await api.post('/auth/login', credentials);
        const { token, user } = response.data;
        
        Cookies.set('token', token, { expires: 7 });
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch({ type: 'SET_USER', payload: user });
        
        return { success: true };
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Login failed' });
        return { success: false, error: error.response?.data?.message };
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    
    register: async (userData) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await api.post('/auth/register', userData);
        const { token, user } = response.data;
        
        Cookies.set('token', token, { expires: 7 });
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch({ type: 'SET_USER', payload: user });
        
        return { success: true };
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Registration failed' });
        return { success: false, error: error.response?.data?.message };
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    
    logout: () => {
      Cookies.remove('token');
      delete api.defaults.headers.common['Authorization'];
      dispatch({ type: 'LOGOUT' });
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}