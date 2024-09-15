/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import config from "../../config"; // Importar configuração da API base

const ProductFormEdit = ({ product = {}, onSubmitSuccess, darkMode }) => {
  const [name, setName] = useState(product.name || "");
  const [price, setPrice] = useState(product.price || "");
  const [sellingPrice, setSellingPrice] = useState(product.sellingPrice || "");
  const [amount, setAmount] = useState(product.amount || "");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setSellingPrice(product.sellingPrice);
      setAmount(product.amount);
    }
  }, [product]);

  // Função para atualizar o produto via API (PUT)
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name,
      price: parseFloat(price),
      sellingPrice: parseFloat(sellingPrice),
      amount: parseInt(amount, 10),
    };

    // Chamada para a API PUT /change/{id}
    fetch(`${config.apiBaseUrl}products/change/${product.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro ao atualizar o produto");
        }
      })
      .then((data) => {
        console.log("Produto atualizado com sucesso:", data);
        window.location.reload();
        if (onSubmitSuccess) {
          onSubmitSuccess(data); // Chama a função de sucesso (opcional),,
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        setError("Erro ao atualizar o produto. Tente novamente.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2">Nome do Produto</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`p-2 border rounded-md w-full ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Preço</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`p-2 border rounded-md w-full ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Preço de Venda</label>
        <input
          type="number"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          className={`p-2 border rounded-md w-full ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Quantidade</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`p-2 border rounded-md w-full ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-gray-900 border-gray-300"
          }`}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="text-white bg-indigo-600 dark:bg-indigo-500 px-4 py-2 rounded-md"
      >
        Atualizar Produto
      </button>
    </form>
  );
};

export default ProductFormEdit;
