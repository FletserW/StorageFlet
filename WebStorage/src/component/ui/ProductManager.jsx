// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Plus, ShoppingCart, Trash2 } from "lucide-react"; 

// eslint-disable-next-line react/prop-types
function ProductManager({ darkMode, onConfirm }) {
  const [quantity, setQuantity] = useState(0);
  const [unitType, setUnitType] = useState("unit"); // "unit" ou "box"
  const [action, setAction] = useState(""); // ação selecionada

  const handleActionClick = (selectedAction) => {
    setAction(selectedAction);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm({ quantity, unitType, action });
    }
  };

  return (
    <div className={`p-4 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} rounded-lg shadow-md`}>
      {/* Gerenciar Quantidade */}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Quantidade
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className={`w-full mt-2 p-2 border ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-gray-100 text-gray-900 border-gray-300"
          } rounded-md`}
          min="0"
        />
      </div>

      {/* Tipo de Quantidade */}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Tipo de Quantidade
        </label>
        <select
          value={unitType}
          onChange={(e) => setUnitType(e.target.value)}
          className={`w-full mt-2 p-2 border ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-gray-100 text-gray-900 border-gray-300"
          } rounded-md`}
        >
          <option value="unit">Unidade</option>
          <option value="box">Caixa (10 por caixa)</option>
        </select>
        {unitType === "box" && (
          <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Cada caixa contém 10 unidades
          </p>
        )}
      </div>

      {/* Ações */}
      <div className="mb-4">
        <label className="block text-sm font-medium">
          Ações
        </label>
        <div className="flex space-x-4 mt-2">
          {/* Adicionar */}
          <button
            onClick={() => handleActionClick("adicionar")}
            className={`flex items-center p-2 border rounded-md ${
              action === "adicionar"
                ? "bg-green-500 text-white"
                : darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
          >
            <Plus className="mr-2" />
            Adicionar
          </button>
          {/* Vender */}
          <button
            onClick={() => handleActionClick("vender")}
            className={`flex items-center p-2 border rounded-md ${
              action === "vender"
                ? "bg-blue-500 text-white"
                : darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
          >
            <ShoppingCart className="mr-2" />
            Vender
          </button>
          {/* Perder */}
          <button
            onClick={() => handleActionClick("perder")}
            className={`flex items-center p-2 border rounded-md ${
              action === "perder"
                ? "bg-red-500 text-white"
                : darkMode
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-gray-100 text-gray-900 border-gray-300"
            }`}
          >
            <Trash2 className="mr-2" />
            Perder
          </button>
        </div>
      </div>

      {/* Botão de Confirmação */}
      <div className="flex justify-end">
        <button
          onClick={handleConfirm}
          className="text-white bg-indigo-600 dark:bg-indigo-500 border border-transparent shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 px-4 py-2 rounded-md"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}

export default ProductManager;
