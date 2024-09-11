/* eslint-disable react/prop-types */
const ProductTable = ({ products, darkMode, onRowClick, selectedProduct }) => {
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
              Preço (Venda)
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
              Quantidade
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className={`cursor-pointer ${
                selectedProduct && selectedProduct.id === product.id
                  ? "bg-indigo-100 dark:bg-indigo-800" // Aplica uma cor diferente ao produto selecionado
                  : darkMode
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => onRowClick(product)} // Chama a função ao clicar na linha
            >
              <td className="border-b p-2">{product.name}</td>
              <td className="border-b p-2">{product.enterprise}</td>
              <td className="border-b p-2">
                ${product.sellingPrice.toFixed(2)} {/* Adiciona o "$" e formata o preço */}
              </td>
              <td className="border-b p-2">
                ${product.price.toFixed(2)} {/* Adiciona o "$" e formata o preço */}
              </td>
              <td className="border-b p-2">{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
