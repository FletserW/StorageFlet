/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const ProductTable = ({ products, darkMode }) => {
  return (
    <div className="overflow-y-auto max-h-96">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th
              className={`border-b p-2 ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-gray-600 border-gray-300"
              }`}
            >
              Nome
            </th>
            <th
              className={`border-b p-2 ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-gray-600 border-gray-300"
              }`}
            >
              Empresa
            </th>
            <th
              className={`border-b p-2 ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-gray-600 border-gray-300"
              }`}
            >
              Valor (Venda)
            </th>
            <th
              className={`border-b p-2 ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-gray-600 border-gray-300"
              }`}
            >
              Preço
            </th>
            <th
              className={`border-b p-2 ${
                darkMode
                  ? "text-gray-300 border-gray-700"
                  : "text-gray-600 border-gray-300"
              }`}
            >
              Qtd
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className={
                darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-900"
              }
            >
              <td className="border-b p-2">{product.name}</td>
              <td className="border-b p-2">{product.enterprise}</td>
              <td className="border-b p-2">{product.sellingPrice}</td>
              <td className="border-b p-2">{product.price}</td>
              <td className="border-b p-2">{product.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
