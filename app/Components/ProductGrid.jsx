'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';

const ProductGrid = ({ products, onDelete, loading, error }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  const filterByPrice = (product) => {
    if (selectedPriceRange === 'all') return true;
    if (selectedPriceRange === '<50') return product.price < 50;
    if (selectedPriceRange === '50-100') return product.price >= 50 && product.price <= 100;
    if (selectedPriceRange === '>100') return product.price > 100;
    return true;
  };

  const filteredProducts = products.filter(filterByPrice);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    setCurrentIndex(0);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (!showModal || !selectedProduct?.images?.length) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [showModal, selectedProduct]);

  return (
    <div className="relative px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Our Products</h2>

      {loading && (
        <div className="text-center text-blue-600 font-medium py-10 text-lg">Loading products...</div>
      )}

      {error && (
        <div className="text-center text-red-600 font-medium py-10 text-lg">Failed to load products: {error}</div>
      )}

      {!loading && products.length === 0 && !error && (
        <div className="text-center text-gray-600 font-medium py-10 text-lg">No products available</div>
      )}

      {/* 🔧 Layout with Filter Sidebar + Product Grid */}
      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* 🔧 Filter Sidebar */}
        <div className="w-full lg:w-1/5 bg-white shadow-md rounded-lg p-4 h-fit">
          <h3 className="font-bold text-lg mb-2 text-gray-800">Filter by Price</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="all" checked={selectedPriceRange === 'all'} onChange={() => setSelectedPriceRange('all')} />
                All
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="<50" checked={selectedPriceRange === '<50'} onChange={() => setSelectedPriceRange('<50')} />
                Below $50
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="50-100" checked={selectedPriceRange === '50-100'} onChange={() => setSelectedPriceRange('50-100')} />
                $50 – $100
              </label>
            </li>
            <li>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value=">100" checked={selectedPriceRange === '>100'} onChange={() => setSelectedPriceRange('>100')} />
                Above $100
              </label>
            </li>
          </ul>
        </div>

        {/* 🔧 Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg p-4 relative hover:shadow-xl transition-shadow duration-300"
            >
              <div onClick={() => handleCardClick(product)} className="cursor-pointer">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="object-contain w-full h-40 mb-4 rounded"
                />
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-blue-600 font-bold text-base">${product.price}</p>
                <p className="text-yellow-500 text-base">
                  {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(product.id);
                }}
                className="absolute bottom-2 right-2 text-red-600 hover:text-red-800 transition"
                title="Delete Product"
              >
                <FaTrash size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🔧 Modal remains unchanged */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 p-4 sm:p-6">
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl relative overflow-y-auto max-h-[90vh]">
    <button
      onClick={handleCloseModal}
      className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
    >
      ×
    </button>

    <h2 className="text-xl sm:text-2xl font-extrabold text-center mb-4 text-black">
      {selectedProduct.title}
    </h2>

    {selectedProduct.images?.length > 0 && (
      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 mb-6 overflow-hidden rounded">
        <Image
          src={selectedProduct.images[currentIndex]}
          alt={`${selectedProduct.title}-${currentIndex}`}
          fill
          className="object-cover rounded transition-all duration-700 ease-in-out"
        />
      </div>
    )}

    <div className="text-center mb-3">
      <p className="text-blue-600 font-bold text-lg sm:text-xl">${selectedProduct.price}</p>
      <p className="text-yellow-500 text-base sm:text-lg">
        {'★'.repeat(selectedProduct.rating)}{'☆'.repeat(5 - selectedProduct.rating)}
      </p>
    </div>

    <h3 className="font-semibold text-md sm:text-lg mt-4 mb-2 text-gray-800">About the product:</h3>
    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
      {selectedProduct.description}
    </p>
  </div>
</div>

      )}
    </div>
  );
};

export default ProductGrid;
