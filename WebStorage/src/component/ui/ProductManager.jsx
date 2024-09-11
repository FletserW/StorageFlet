/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Plus, ShoppingCart, Trash2 } from "lucide-react";
import config from "../../config";

// eslint-disable-next-line react/prop-types
function ProductManager({ darkMode, onConfirm, product }) {
  const [quantity, setQuantity] = useState(0);
  const [unitType, setUnitType] = useState("unit"); // "unit" ou "box"
  const [action, setAction] = useState(""); // ação selecionada
  const [boxSize, setBoxSize] = useState(90); // Tamanho padrão da caixa

  useEffect(() => {
    if (product && product.amount) {
      // Atualiza o valor da caixa com base no 'amount' do produto selecionado
      setBoxSize(product.amount);
    }
  }, [product]);

  const handleActionClick = (selectedAction) => {
    setAction(selectedAction);
  };

  const handleConfirm = () => {
    let updatedQuantity = product.quantity; // Quantidade atual no estoque

    // Verificar se o tipo de unidade é caixa ou unidade
    let modifiedQuantity;
    let totalCost;

    if (unitType === "box") {
      modifiedQuantity = quantity * boxSize; // Total de unidades adicionadas
      totalCost = product.price * quantity; // Custo total é preço por caixa vezes número de caixas
    } else {
      modifiedQuantity = quantity;
      const unitCost = product.price / boxSize; // Custo por unidade
      totalCost = unitCost * quantity; // Custo total é custo por unidade vezes número de unidades
    }

    // Data atual para o registro monthYear
    const currentDate = new Date();
    const monthYear = `${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;

    if (action === "adicionar") {
      updatedQuantity += modifiedQuantity;

      // Verificar se já existe um registro de monthYear
      fetch(`${config.apiBaseUrl}wallets/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const existingRecord = data.find(
            (record) => record.monthYear === monthYear
          );

          let walletData = {
            monthYear: monthYear,
            gainValue: existingRecord ? existingRecord.gainValue : 0, // Mantém o valor de ganho atual
            spentValue: totalCost,
            lossValue: existingRecord ? existingRecord.lossValue : 0, // Mantém o valor de perda atual
          };

          if (existingRecord) {
            // Atualizar o registro existente somando o novo valor gasto
            walletData.spentValue += existingRecord.spentValue;

            fetch(
              `${config.apiBaseUrl}wallets/change/${existingRecord.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(walletData),
              }
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((updatedRecord) =>
                console.log("Registro atualizado:", updatedRecord)
              )
              .catch((error) =>
                console.error("Erro ao atualizar registro:", error)
              );
          } else {
            // Criar novo registro
            fetch(`${config.apiBaseUrl}wallets/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(walletData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((newRecord) =>
                console.log("Novo registro criado:", newRecord)
              )
              .catch((error) =>
                console.error("Erro ao criar registro:", error)
              );
          }
        })
        .catch((error) => console.error("Erro ao buscar registros:", error));
    } else if (action === "vender") {
      updatedQuantity -= modifiedQuantity;

      // Calcular o valor de ganho
      const unitSellingPrice = product.sellingPrice;
      const unitCostPrice = product.price / boxSize;
      const gain = (unitSellingPrice - unitCostPrice) * modifiedQuantity;

      // Verificar se já existe um registro de monthYear
      fetch(`${config.apiBaseUrl}wallets/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const existingRecord = data.find(
            (record) => record.monthYear === monthYear
          );

          let walletData = {
            monthYear: monthYear,
            gainValue: gain,
            spentValue: existingRecord ? existingRecord.spentValue : 0,
            lossValue: existingRecord ? existingRecord.lossValue : 0,
          };

          if (existingRecord) {
            // Atualizar o registro existente somando o novo ganho
            walletData.gainValue += existingRecord.gainValue;

            fetch(
              `${config.apiBaseUrl}wallets/change/${existingRecord.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(walletData),
              }
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((updatedRecord) =>
                console.log("Registro atualizado:", updatedRecord)
              )
              .catch((error) =>
                console.error("Erro ao atualizar registro:", error)
              );
          } else {
            // Criar novo registro
            fetch(`${config.apiBaseUrl}wallets/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(walletData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((newRecord) =>
                console.log("Novo registro criado:", newRecord)
              )
              .catch((error) =>
                console.error("Erro ao criar registro:", error)
              );
          }
        })
        .catch((error) => console.error("Erro ao buscar registros:", error));
    } else if (action === "perder") {
      updatedQuantity -= modifiedQuantity; // Reduz a quantidade no estoque

      // Calcular o custo da perda (usando o preço do produto)
      const lossCost = totalCost;

      // Verificar se já existe um registro de monthYear
      fetch(`${config.apiBaseUrl}wallets/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const existingRecord = data.find(
            (record) => record.monthYear === monthYear
          );

          let walletData = {
            monthYear: monthYear,
            gainValue: existingRecord ? existingRecord.gainValue : 0,
            spentValue: existingRecord ? existingRecord.spentValue : 0,
            lossValue: lossCost, // Adiciona o custo da perda
          };

          if (existingRecord) {
            // Atualizar o registro existente somando o novo valor de perda
            walletData.lossValue += existingRecord.lossValue;

            fetch(
              `${config.apiBaseUrl}wallets/change/${existingRecord.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(walletData),
              }
            )
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((updatedRecord) =>
                console.log("Registro de perda atualizado:", updatedRecord)
              )
              .catch((error) =>
                console.error("Erro ao atualizar registro de perda:", error)
              );
          } else {
            // Criar novo registro de perda
            fetch(`${config.apiBaseUrl}wallets/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(walletData),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
              })
              .then((newRecord) =>
                console.log("Novo registro de perda criado:", newRecord)
              )
              .catch((error) =>
                console.error("Erro ao criar registro de perda:", error)
              );
          }
        })
        .catch((error) => console.error("Erro ao buscar registros:", error));
    }

    // Atualizar o estoque no backend
    fetch(`${config.apiBaseUrl}stocks/change/${product.stockId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: updatedQuantity,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Estoque atualizado:", data);
        if (onConfirm) {
          onConfirm(data);
        }
      })
      .catch((error) => {
        console.error("Erro ao atualizar estoque:", error);
      });
      onConfirm();
  };

  return (
    <div
      className={`p-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } rounded-lg shadow-md`}
    >
      {/* Gerenciar Quantidade */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Quantidade</label>
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
        <label className="block text-sm font-medium">Tipo de Quantidade</label>
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
          <option value="box">Caixa ({boxSize} por caixa)</option>
        </select>
        {unitType === "box" && (
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Cada caixa contém {boxSize} unidades
          </p>
        )}
      </div>

      {/* Ações */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Ações</label>
        <div className="flex space-x-4 mt-2">
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
