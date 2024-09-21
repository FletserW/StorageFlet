import React from 'react';

const OrderCard = ({ order, onSelect, darkMode }) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer p-4 bg-white dark:bg-gray-800 border rounded-md shadow-md ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}
    >
      <h3 className="text-lg font-semibold">Pedido #{order.id}</h3>
      <p>Data de Entrega: {new Date(order.date).toLocaleDateString()}</p>
      <p>Fornecedor: {order.supplier}</p>
      <p>Preço Total: R$ {order.totalValue.toFixed(2)}</p>
    </div>
  );
};

export default OrderCard;
