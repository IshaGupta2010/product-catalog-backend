'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';

const Header = ({ searchQuery, setSearchQuery, onAddProductClick }) => {
  const router = useRouter();


  return (
    <header className="w-full bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-900 text-white px-4 py-3 shadow-lg">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">

        {/* Left: Logo */}
        <div
          onClick={() => router.push('/')}
          className="text-2xl sm:text-3xl font-extrabold tracking-wider cursor-pointer hover:text-indigo-300 transition duration-300 text-center sm:text-left"
        >
          🛒 ShopEase
        </div>

        {/* Center: Search */}
        <div className="flex items-center bg-white dark:bg-gray-700 rounded-full overflow-hidden shadow-sm focus-within:ring-2 ring-indigo-400 w-full">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-2 text-black dark:text-white dark:placeholder-gray-300 placeholder-gray-500 focus:outline-none bg-transparent"
          />
        </div>

        {/* Right: Add Product + Toggle */}
        <div className="flex justify-center sm:justify-end items-center gap-3 mt-2 sm:mt-0">
          <button
            onClick={onAddProductClick}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Add Product
          </button>
         
        </div>
      </div>
    </header>
  );
};

export default Header;
