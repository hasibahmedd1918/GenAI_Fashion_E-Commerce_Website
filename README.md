# GenAI Fashion - AI-Powered E-commerce Platform

A complete AI-powered fashion e-commerce website built with React.js frontend and Node.js backend, specifically designed for Bangladeshi fashion market.

## 🚀 Features

### 🤖 AI-Powered Features
- **Smart Chatbot Assistant**: Conversational AI that understands Bengali and English
- **Product Recommendations**: AI-driven product suggestions based on user preferences
- **Virtual Try-On**: Upload photos and virtually try on clothes
- **Natural Language Search**: Search products using natural language queries

### 🛍️ E-commerce Features
- **Product Catalog**: Separate sections for Men's, Women's, and Kids' fashion
- **Shopping Cart**: Add, remove, and manage cart items
- **User Authentication**: Secure login/registration system
- **Order Management**: Complete checkout process with order tracking
- **Wishlist**: Save favorite products for later

### 🎨 UI/UX Features
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Bengali Language Support**: Bilingual interface for Bangladeshi users
- **Modern Design**: Clean, professional interface with smooth animations
- **Cultural Authenticity**: Designed specifically for Bangladeshi fashion preferences

## 🏗️ Architecture

```
genai-fashion/
├── client/                 # React.js Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context for state management
│   │   ├── services/      # API service functions
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── server/                # Node.js Backend
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── controllers/   # Route controllers
│   │   └── config/        # Configuration files
│   └── uploads/           # File uploads directory
└── assets/               # Shared assets and documentation
```

## 🛠️ Technology Stack

### Frontend
- **React.js 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons
- **React Webcam** - Camera integration for virtual try-on

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Helmet** - Security middleware

### Development Tools
- **Concurrently** - Run multiple commands simultaneously
- **Nodemon** - Auto-restart server during development
- **Morgan** - HTTP request logger
- **Joi** - Data validation

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/genai-fashion.git
cd genai-fashion
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/genai-fashion

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Client URL
CLIENT_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=10mb
```

### 4. Database Setup
```bash
# Navigate to server directory
cd server

# Seed the database with sample products
npm run seed
```

### 5. Start the Application
```bash
# From the root directory, start both client and server
npm run dev

# Or start them separately:
# Terminal 1 - Start server
cd server && npm run dev

# Terminal 2 - Start client
cd client && npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎯 Usage Guide

### For Users
1. **Browse Products**: Navigate through Men's, Women's, and Kids' sections
2. **AI Assistant**: Click the AI chat button to get personalized recommendations
3. **Virtual Try-On**: Use the camera feature to virtually try on clothes
4. **Search**: Use the search bar or chat with the AI assistant
5. **Shopping**: Add items to cart and proceed to checkout
6. **Account**: Register/login to save preferences and order history

### For Developers
1. **API Endpoints**: All API routes are documented in the respective route files
2. **Database Models**: Check `server/src/models/` for data structures
3. **Frontend Components**: Reusable components in `client/src/components/`
4. **State Management**: Global state managed through React Context

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=query` - Search products

### Cart & Orders
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### AI Features
- `POST /api/chat` - Process chatbot messages
- `POST /api/chat/recommendations` - Get AI recommendations
- `POST /api/virtual-tryon` - Process virtual try-on images

## 🎨 Design Features

### Color Scheme
- **Primary**: Purple gradient (#7c3aed to #ec4899)
- **Secondary**: Complementary colors for different categories
- **Neutral**: Gray tones for text and backgrounds
- **Accent**: Yellow for highlights and CTAs

### Typography
- **Primary Font**: Inter (clean, modern)
- **Bengali Support**: SolaimanLipi, Kalpurush, Nikosh
- **Hierarchy**: Clear font weights and sizes

### Components
- **Cards**: Product cards with hover effects
- **Buttons**: Gradient buttons with smooth transitions
- **Forms**: Clean, accessible form designs
- **Navigation**: Intuitive menu structure

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product browsing and filtering
- [ ] Search functionality
- [ ] AI chatbot responses
- [ ] Virtual try-on feature
- [ ] Cart operations
- [ ] Checkout process
- [ ] Responsive design on mobile

### API Testing
Use tools like Postman or curl to test API endpoints:
```bash
# Test product API
curl http://localhost:5000/api/products

# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the client application:
```bash
cd client && npm run build
```
2. Deploy the `build` folder to your hosting service
3. Configure environment variables for production

### Backend Deployment (Heroku/Railway)
1. Set up production environment variables
2. Configure MongoDB connection string
3. Deploy the server directory
4. Run database seeding in production

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CLIENT_URL=https://your-frontend-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels** for providing high-quality stock images
- **Lucide** for beautiful icons
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for the flexible database solution

## 📞 Support

For support and questions:
- **Email**: support@genaifashion.com
- **Phone**: +880 1711-123456
- **Address**: Dhaka, Bangladesh

---

**Made with ❤️ for Bangladesh by the GenAI Fashion Team**