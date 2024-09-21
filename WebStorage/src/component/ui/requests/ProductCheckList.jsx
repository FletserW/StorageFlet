/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import config from '../../../config';

const ProductChecklist = ({ order, darkMode, onClose }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.apiBaseUrl}orders/${order.id}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, [order.id]);

  return (
    <div>
      <h2 className="text-xl font-semibold">Produtos do Pedido #{order.id}</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="flex items-center">
            <input
              type="checkbox"
              checked={product.checked}
              onChange={() => {
                // Toggle checked state
                setProducts(products.map(p =>
                  p.id === product.id ? { ...p, checked: !p.checked } : p
                ));
              }}
              className="mr-2"
            />
            <span>{product.name}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onClose}
        className="mt-4 text-white bg-red-600 p-2 rounded-md"
      >
        Fechar
      </button>
    </div>
  );
};

export default ProductChecklist;
