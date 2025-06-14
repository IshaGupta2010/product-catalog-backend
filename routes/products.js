const express = require('express');
const router = express.Router();

// In-memory product array initialized with dummy data
let products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 99.99,
    image: "/images/headphones4.jpg",
    rating: 4,
    description: "Enjoy immersive sound and freedom with these wireless headphones, offering crystal-clear audio, deep bass, and 40-hour battery life. Perfect for travel, workouts, or focused work sessions.",
    images: ["/images/headphones1.jpg", "/images/headphones2.jpg", "/images/headphones3.jpg"]
  },
  {
    id: 2,
    title: "Smartphone",
    price: 599.99,
    image: "/images/smartphone3.jpg",
    rating: 5,
    description: "This sleek smartphone features a stunning AMOLED display, powerful processor, and intelligent AI camera system. Ideal for capturing moments, multitasking, and entertainment on the go.",
    images: ["/images/smartphone1.jpg", "/images/smartphone2.jpg", "/images/smartphone4.jpg"]
  },
  {
    id: 3,
    title: "Gaming Mouse",
    price: 49.99,
    image: "/images/mouse1.jpg",
    rating: 3,
    description: "Designed for competitive gamers, this ergonomic RGB mouse boasts 16,000 DPI sensitivity, customizable buttons, and macro support. Built for speed, accuracy, and long-lasting comfort.",
    images: ["/images/mouse2.jpg", "/images/mouse3.jpg"]
  },
  {
    id: 4,
    title: "Bluetooth Speaker",
    price: 79.99,
    image: "/images/speaker1.jpg",
    rating: 4,
    description: "Portable and waterproof, this Bluetooth speaker delivers rich bass and crisp treble with 24-hour playtime. Perfect for outdoor adventures, poolside lounging, or indoor parties.",
    images: ["/images/speaker2.jpg", "/images/speaker3.jpg"]
  },
  {
    id: 5,
    title: "Smartwatch",
    price: 199.99,
    image: "/images/smartwatch1.jpg",
    rating: 4,
    description: "Stay connected and healthy with this stylish smartwatch featuring fitness tracking, heart rate monitoring, sleep analysis, and smart notifications. Compatible with iOS and Android devices.",
    images: ["/images/smartwatch2.jpg", "/images/smartwatch3.jpg", "/images/smartwatch4.jpg"]
  },
  {
    id: 6,
    title: "Laptop Stand",
    price: 34.99,
    image: "/images/laptopstand1.jpg",
    rating: 3,
    description: "Improve posture and airflow with this adjustable, foldable laptop stand. Ideal for remote work or study setups, offering stability and convenience for laptops of all sizes.",
    images: ["/images/laptopstand2.jpg", "/images/laptopstand3.jpg"]
  },
  {
    id: 7,
    title: "Noise Cancelling Earbuds",
    price: 129.99,
    image: "/images/earbuds2.jpg",
    rating: 5,
    description: "These compact earbuds offer premium sound, active noise cancellation, and fast charging. Enjoy clear calls and immersive music with all-day comfort and a secure fit.",
    images: ["/images/earbuds3.jpg", "/images/earbuds2.jpg"]
  },
  {
    id: 8,
    title: "4K Action Camera",
    price: 149.99,
    image: "/images/actioncam2.jpg",
    rating: 4,
    description: "Capture every adventure in stunning 4K resolution. This rugged action camera is waterproof and includes wide-angle lens support and essential accessories for outdoor exploration.",
    images: ["/images/actioncam1.jpg", "/images/actioncam3.jpg", "/images/actioncam4.jpg"]
  }
];

// GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// const productId = 1;
// const single = products.find(product => product.id === productId);

// console.log(single);

// router.get('/product/:id', (req, res) => {
//   const productId = parseInt(req.params.id);
//   const product = products.find(p => p.id === productId);

//   if (product) {
//     res.json(product);
//   }
// })

// POST new product
// 🔹 In routes/products.js — update the POST route:

router.post('/', (req, res) => {
  const { title, price, image, images, description, rating } = req.body;

  if (!title || !price || !image || !Array.isArray(images)) {
    return res.status(400).json({ error: 'Title, price, image, and images array are required' });
  }

  const newProduct = {
    id: Date.now(),
    title,
    price: parseFloat(price),
    image,       // Main image for grid card
    images,      // Additional images for modal slider
    description: description || '',
    rating: rating || 0
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});


// DELETE product by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  products.splice(index, 1);
  res.status(200).json({ message: 'Product deleted successfully' });
});

module.exports = router;
