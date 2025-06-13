'use client';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddProductDialog = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleFileUpload = (files) => {
    const imageArray = [];
    const fileReaders = [];

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      fileReaders.push(
        new Promise((resolve) => {
          reader.onloadend = () => {
            imageArray.push(reader.result);
            resolve();
          };
          reader.readAsDataURL(file);
        })
      );
    });

    Promise.all(fileReaders).then(() => {
      setImages(imageArray);
    });
  };

  const handleSave = () => {
    const validImages = images.filter(Boolean);

    if (!title || !price || validImages.length === 0 || !description) {
      toast.error("Product cannot be added. Fill all fields and add at least 1 image.");
      return;
    }

    const newProduct = {
      title,
      price: parseFloat(price),
      image: validImages[0],
      images: validImages.slice(1),
      description,
      rating: 0,
    };

    onSave(newProduct);
    onClose();

    setTitle('');
    setPrice('');
    setDescription('');
    setImages([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Add New Product</h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full p-2 border rounded text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full p-2 border rounded text-black"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full p-1 border rounded text-black"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
            {images.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`preview-${index}`}
                    className="w-20 h-20 object-cover border rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded text-black resize-none h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-gray-900"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductDialog;
