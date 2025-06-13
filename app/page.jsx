'use client';
import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import AddProductDialog from './Components/AddProductDialog';
import ProductGrid from './Components/ProductGrid';
import { toast } from 'react-toastify';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/products');
      if (!res.ok) throw new Error('Unable to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.info('Product deleted');
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSaveProduct = async (newProduct) => {
  try {
    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (!res.ok) throw new Error('Failed to add product');
    const addedProduct = await res.json();
    setProducts((prev) => [...prev, addedProduct]);
    toast.success('Product added successfully!');
  } catch (err) {
    toast.error(err.message);
  }
};


  // 🔍 Filter products based on searchQuery
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddProductClick={() => setShowDialog(true)}
      />

      <div className="p-4">
        <ProductGrid
          products={filteredProducts}
          onDelete={handleDeleteProduct}
          loading={loading}
          error={error}
        />
      </div>

      <AddProductDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onSave={handleSaveProduct}
      />
    </main>
  );
}
