# 🛍️ Dynamic Product Catalog Web App

A fully functional product catalog system built using **Next.js**, **Tailwind CSS**, and **Express.js**. It provides seamless product browsing, adding, and deletion capabilities along with support for multiple images per product.

## Features

- 🧩 Dynamic product grid layout with responsive design
- 🔍 Live search functionality to filter products by title
- ➕ Add new products with fields:
  - Title
  - Price
  - Main image URL
  - Description (optional)
  - Rating (optional)
  - Additional image URLs (optional array)
- ❌ Delete products instantly from UI
- ⚠️ Toast notifications using `react-toastify`
- 🧠 Error handling for invalid form input and API failures

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Express.js (with in-memory storage)
- **Tools**: React Toastify, Fetch API

## Project Structure

project/
├── backend/
│ ├── index.js # Express server entry
│ └── routes/
│ └── products.js # Product API routes (GET, POST, DELETE)
├── frontend/
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── AddProductDialog.jsx
│ │ └── ProductGrid.jsx
│ └── page.jsx # Main page rendering product grid

## API Endpoints

### `GET /api/products`
Fetch all available products from the in-memory store.

### `POST /api/products`
Add a new product. Expected JSON body:

```json
{
  "title": "Smartwatch",
  "price": 199.99,
  "image": "/images/smartwatch1.jpg",
  "images": ["/images/smartwatch2.jpg", "/images/smartwatch3.jpg"],
  "rating": 4,
  "description": "Fitness tracking, message alerts, and sleep monitoring."
}

-title, price, and image are required.

-images, description, and rating are optional.

DELETE /api/products/:id
Delete a product by ID. Returns success or error message.

Setup Instructions

Backend-

cd backend
npm install
node index.js
Runs server on http://localhost:5000

Frontend-

cd frontend
npm install
npm run dev
Runs UI on http://localhost:3000

Notes-
-The backend uses an in-memory array, so data resets on server restart.

-Use local image paths or public URLs for image fields.

-Adding more than one image is supported via an array in the images field.

-Main image is used for product cards; additional images can be used in sliders or modals.