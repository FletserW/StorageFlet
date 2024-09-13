/* eslint-disable react/prop-types */
const SupplierTable = ({ suppliers, darkMode, onRowClick, selectedSupplier }) => {
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
                Empresa
              </th>
              <th
                className={`border-b p-2 ${
                  darkMode
                    ? "text-gray-300 border-gray-700"
                    : "text-gray-600 border-gray-300"
                }`}
              >
                Fornecedor
              </th>
              <th
                className={`border-b p-2 ${
                  darkMode
                    ? "text-gray-300 border-gray-700"
                    : "text-gray-600 border-gray-300"
                }`}
              >
                Telefone
              </th>
              <th
                className={`border-b p-2 ${
                  darkMode
                    ? "text-gray-300 border-gray-700"
                    : "text-gray-600 border-gray-300"
                }`}
              >
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className={`cursor-pointer ${
                  selectedSupplier && selectedSupplier.id === supplier.id
                    ? "bg-indigo-100 dark:bg-indigo-800" // Aplica uma cor diferente ao fornecedor selecionado
                    : darkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => onRowClick(supplier)} // Chama a função ao clicar na linha
              >
                <td className="border-b p-2">{supplier.enterprise}</td>
                <td className="border-b p-2">{supplier.contact}</td>
                <td className="border-b p-2">{supplier.telephone}</td>
                <td className="border-b p-2">{supplier.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default SupplierTable;
  