import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, CartItem, ChatMessage, Product } from '../types';

interface AppState {
  user: User | null;
  cart: CartItem[];
  chatMessages: ChatMessage[];
  searchQuery: string;
  selectedCategory: 'all' | 'men' | 'women' | 'kids';
  isLoading: boolean;
  virtualTryOn: {
    isActive: boolean;
    selectedProduct: Product | null;
    userPhoto: string | null;
  };
}

type AppAction = 
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'CLEAR_CHAT' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: 'all' | 'men' | 'women' | 'kids' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_VIRTUAL_TRY_ON'; payload: { isActive: boolean; selectedProduct?: Product | null; userPhoto?: string | null } };

const initialState: AppState = {
  user: null,
  cart: [],
  chatMessages: [],
  searchQuery: '',
  selectedCategory: 'all',
  isLoading: false,
  virtualTryOn: {
    isActive: false,
    selectedProduct: null,
    userPhoto: null
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(
        item => item.product.id === action.payload.product.id &&
                item.selectedSize === action.payload.selectedSize &&
                item.selectedColor === action.payload.selectedColor
      );
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.product.id &&
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
        cart: state.cart.filter(item => 
          `${item.product.id}-${item.selectedSize}-${item.selectedColor}` !== action.payload
        )
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    
    case 'CLEAR_CHAT':
      return { ...state, chatMessages: [] };
    
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_VIRTUAL_TRY_ON':
      return { 
        ...state, 
        virtualTryOn: { 
          ...state.virtualTryOn, 
          ...action.payload 
        } 
      };
    
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('genai-fashion-user');
    const savedCart = localStorage.getItem('genai-fashion-cart');
    
    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }
    
    if (savedCart) {
      const cartItems = JSON.parse(savedCart);
      cartItems.forEach((item: CartItem) => {
        dispatch({ type: 'ADD_TO_CART', payload: item });
      });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('genai-fashion-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('genai-fashion-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('genai-fashion-user');
    }
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
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