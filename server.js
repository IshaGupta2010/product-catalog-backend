const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Product API routes
app.use('/api/products', productRoutes);

// 🔹 Fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// 🔹 Global error handler
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
