const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Sample product data for Bangladesh fashion
const sampleProducts = [
  // Men's Fashion
  {
    name: 'Premium Cotton Panjabi',
    namebn: 'প্রিমিয়াম কটন পাঞ্জাবি',
    category: 'men',
    subcategory: 'traditional',
    price: 2500,
    originalPrice: 3200,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
    description: 'Elegant traditional panjabi perfect for Eid and special occasions',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Cream', 'Light Blue', 'Grey'],
    rating: 4.8,
    reviews: 156,
    stock: 50,
    isTraditional: true,
    occasion: ['eid', 'wedding', 'formal'],
    tags: ['panjabi', 'traditional', 'cotton', 'eid'],
    featured: true
  },
  {
    name: 'Designer Kurta Set',
    namebn: 'ডিজাইনার কুর্তা সেট',
    category: 'men',
    subcategory: 'traditional',
    price: 3200,
    originalPrice: 4000,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
    description: 'Handcrafted kurta with matching pajama for festive occasions',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Maroon', 'Navy', 'Golden', 'Black'],
    rating: 4.9,
    reviews: 89,
    stock: 30,
    isTraditional: true,
    occasion: ['wedding', 'festival', 'party'],
    tags: ['kurta', 'designer', 'festive']
  },
  {
    name: 'Casual Cotton Shirt',
    category: 'men',
    subcategory: 'casual',
    price: 1200,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    description: 'Comfortable cotton shirt for daily wear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'White', 'Black', 'Grey'],
    rating: 4.5,
    reviews: 234,
    stock: 75,
    occasion: ['casual', 'office'],
    tags: ['shirt', 'cotton', 'casual']
  },
  {
    name: 'Formal Blazer',
    category: 'men',
    subcategory: 'formal',
    price: 4500,
    image: 'https://images.pexels.com/photos/1848565/pexels-photo-1848565.jpeg',
    description: 'Professional blazer for business occasions',
    sizes: ['M', 'L', 'XL'],
    colors: ['Navy', 'Black', 'Grey'],
    rating: 4.7,
    reviews: 67,
    stock: 25,
    occasion: ['office', 'formal', 'business'],
    tags: ['blazer', 'formal', 'business']
  },
  {
    name: 'Denim Jeans',
    category: 'men',
    subcategory: 'casual',
    price: 2200,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    description: 'Classic fit denim jeans',
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black', 'Grey'],
    rating: 4.6,
    reviews: 189,
    stock: 60,
    occasion: ['casual', 'daily'],
    tags: ['jeans', 'denim', 'casual']
  },

  // Women's Fashion
  {
    name: 'Elegant Silk Saree',
    namebn: 'এলিগ্যান্ট সিল্ক শাড়ি',
    category: 'women',
    subcategory: 'traditional',
    price: 4500,
    originalPrice: 6000,
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    description: 'Beautiful silk saree with intricate border work',
    sizes: ['Free Size'],
    colors: ['Red', 'Maroon', 'Golden', 'Green'],
    rating: 4.9,
    reviews: 298,
    stock: 40,
    isTraditional: true,
    occasion: ['wedding', 'festival', 'party'],
    tags: ['saree', 'silk', 'traditional', 'wedding'],
    featured: true
  },
  {
    name: 'Designer Salwar Kameez',
    namebn: 'ডিজাইনার সালোয়ার কামিজ',
    category: 'women',
    subcategory: 'traditional',
    price: 2800,
    originalPrice: 3500,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    description: 'Trendy salwar kameez with embroidery work',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Blue', 'White', 'Yellow'],
    rating: 4.7,
    reviews: 156,
    stock: 55,
    isTraditional: true,
    occasion: ['daily', 'office', 'casual'],
    tags: ['salwar', 'kameez', 'embroidery']
  },
  {
    name: 'Cotton Kurti',
    namebn: 'কটন কুর্তি',
    category: 'women',
    subcategory: 'casual',
    price: 1200,
    image: 'https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg',
    description: 'Comfortable cotton kurti for everyday wear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Pink', 'Blue', 'Yellow', 'Green'],
    rating: 4.5,
    reviews: 445,
    stock: 80,
    occasion: ['daily', 'casual'],
    tags: ['kurti', 'cotton', 'casual']
  },
  {
    name: 'Party Wear Gown',
    category: 'women',
    subcategory: 'party',
    price: 3500,
    image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg',
    description: 'Glamorous gown for special occasions',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Red', 'Navy', 'Maroon'],
    rating: 4.8,
    reviews: 89,
    stock: 35,
    occasion: ['party', 'wedding', 'formal'],
    tags: ['gown', 'party', 'glamorous']
  },
  {
    name: 'Casual Western Top',
    category: 'women',
    subcategory: 'western',
    price: 900,
    image: 'https://images.pexels.com/photos/1752860/pexels-photo-1752860.jpeg',
    description: 'Trendy western top for modern women',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Pink', 'Blue'],
    rating: 4.4,
    reviews: 267,
    stock: 90,
    occasion: ['casual', 'daily'],
    tags: ['top', 'western', 'trendy']
  },

  // Kids Fashion
  {
    name: 'Boys Cotton T-Shirt',
    namebn: 'ছেলেদের কটন টি-শার্ট',
    category: 'kids',
    subcategory: 'casual',
    price: 450,
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
    description: 'Comfortable cotton t-shirt for active kids',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['Blue', 'Red', 'Green', 'Yellow', 'White'],
    rating: 4.6,
    reviews: 178,
    stock: 100,
    occasion: ['daily', 'casual', 'school'],
    tags: ['tshirt', 'cotton', 'kids', 'boys']
  },
  {
    name: 'Girls Frock Dress',
    namebn: 'মেয়েদের ফ্রক ড্রেস',
    category: 'kids',
    subcategory: 'dress',
    price: 850,
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
    description: 'Beautiful frock dress for little princesses',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Pink', 'Purple', 'Blue', 'Yellow'],
    rating: 4.8,
    reviews: 134,
    stock: 70,
    occasion: ['party', 'festival', 'casual'],
    tags: ['frock', 'dress', 'girls', 'party']
  },
  {
    name: 'Boys Panjabi Set',
    namebn: 'ছেলেদের পাঞ্জাবি সেট',
    category: 'kids',
    subcategory: 'traditional',
    price: 1200,
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
    description: 'Traditional panjabi set for special occasions',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['White', 'Cream', 'Light Blue'],
    rating: 4.7,
    reviews: 89,
    stock: 45,
    isTraditional: true,
    occasion: ['eid', 'wedding', 'festival'],
    tags: ['panjabi', 'traditional', 'boys', 'eid']
  },
  {
    name: 'School Uniform Shirt',
    namebn: 'স্কুলের ইউনিফর্ম শার্ট',
    category: 'kids',
    subcategory: 'uniform',
    price: 380,
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
    description: 'Quality school uniform shirt',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    colors: ['White', 'Light Blue'],
    rating: 4.5,
    reviews: 456,
    stock: 120,
    occasion: ['school', 'formal'],
    tags: ['uniform', 'school', 'shirt']
  },
  {
    name: 'Winter Sweater',
    namebn: 'শীতের সোয়েটার',
    category: 'kids',
    subcategory: 'winter',
    price: 950,
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
    description: 'Warm and cozy winter sweater',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['Red', 'Blue', 'Green', 'Grey'],
    rating: 4.6,
    reviews: 123,
    stock: 65,
    occasion: ['winter', 'casual'],
    tags: ['sweater', 'winter', 'warm']
  }
];

// Additional products to reach 15+ per category
const additionalProducts = [
  // More Men's items
  {
    name: 'Polo T-Shirt',
    category: 'men',
    subcategory: 'casual',
    price: 1100,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    description: 'Classic polo t-shirt',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'White', 'Grey', 'Red'],
    rating: 4.4,
    reviews: 156,
    stock: 85,
    occasion: ['casual', 'sport'],
    tags: ['polo', 'tshirt', 'casual']
  },
  {
    name: 'Leather Jacket',
    category: 'men',
    subcategory: 'jacket',
    price: 6500,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    description: 'Premium leather jacket',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    rating: 4.9,
    reviews: 45,
    stock: 20,
    occasion: ['casual', 'party'],
    tags: ['leather', 'jacket', 'premium']
  },
  // More Women's items
  {
    name: 'Embroidered Lehenga',
    namebn: 'এমব্রয়ডারি লেহেঙ্গা',
    category: 'women',
    subcategory: 'traditional',
    price: 8500,
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    description: 'Stunning embroidered lehenga for weddings',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Maroon', 'Pink', 'Golden'],
    rating: 4.9,
    reviews: 67,
    stock: 25,
    isTraditional: true,
    occasion: ['wedding', 'party'],
    tags: ['lehenga', 'embroidery', 'wedding']
  },
  {
    name: 'Denim Jacket',
    category: 'women',
    subcategory: 'jacket',
    price: 2200,
    image: 'https://images.pexels.com/photos/1752860/pexels-photo-1752860.jpeg',
    description: 'Trendy denim jacket',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black', 'White'],
    rating: 4.5,
    reviews: 198,
    stock: 55,
    occasion: ['casual', 'daily'],
    tags: ['denim', 'jacket', 'trendy']
  },
  // More Kids items
  {
    name: 'Cartoon Printed Pajama',
    namebn: 'কার্টুন প্রিন্টেড পায়জামা',
    category: 'kids',
    subcategory: 'sleepwear',
    price: 650,
    image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg',
    description: 'Comfortable pajama set with cartoon prints',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Blue', 'Pink', 'Yellow', 'Green'],
    rating: 4.7,
    reviews: 234,
    stock: 95,
    occasion: ['sleep', 'home'],
    tags: ['pajama', 'cartoon', 'sleepwear']
  }
];

const allProducts = [...sampleProducts, ...additionalProducts];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/genai-fashion');
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(allProducts);
    console.log(`✅ Inserted ${insertedProducts.length} products`);

    // Log category counts
    const menCount = await Product.countDocuments({ category: 'men' });
    const womenCount = await Product.countDocuments({ category: 'women' });
    const kidsCount = await Product.countDocuments({ category: 'kids' });

    console.log(`📊 Product counts:`);
    console.log(`   Men: ${menCount}`);
    console.log(`   Women: ${womenCount}`);
    console.log(`   Kids: ${kidsCount}`);
    console.log(`   Total: ${menCount + womenCount + kidsCount}`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, allProducts };