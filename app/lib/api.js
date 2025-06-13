const API = 'http://localhost:5000/api/products';

export const fetchProducts = async () => {
  const res = await fetch(API);
  return await res.json();
};

export const addProduct = async (product) => {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return await res.json();
};

export const deleteProduct = async (id) => {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
};
