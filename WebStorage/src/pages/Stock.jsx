// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Sidebar from "../component/ui/SideBar";
import DarkModeToggle from "../component/ui/DarkModeToggle";


function ProductList() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  const products = [
    { name: "Laptop", company: "Dell", category: "Eletrônicos", price: "$1200", status: "Disponível" },
    { name: "Smartphone", company: "Samsung", category: "Eletrônicos", price: "$800", status: "Disponível" },
    { name: "Teclado Mecânico", company: "Logitech", category: "Acessórios", price: "$150", status: "Indisponível" },
    { name: "Mouse Gamer", company: "Razer", category: "Acessórios", price: "$90", status: "Disponível" },
    { name: "Monitor 4K", company: "LG", category: "Eletrônicos", price: "$500", status: "Disponível" },
  ];

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className={`flex-1 p-4 md:p-8 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"} ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Produtos (5)</h1>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </header>

          {/* Search Bar */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              className={`p-2 border rounded-md w-full max-w-md ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
            />
            <button className="ml-4 text-white bg-indigo-600 dark:bg-indigo-500 border border-transparent shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 px-4 py-2 rounded-md">+ Adicionar Novo</button>
          </div>

          {/* Product Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className={`border-b p-2 ${darkMode ? "text-gray-300 border-gray-700" : "text-gray-600 border-gray-300"}`}>Nome do Produto</th>
                <th className={`border-b p-2 ${darkMode ? "text-gray-300 border-gray-700" : "text-gray-600 border-gray-300"}`}>Empresa</th>
                <th className={`border-b p-2 ${darkMode ? "text-gray-300 border-gray-700" : "text-gray-600 border-gray-300"}`}>Categoria</th>
                <th className={`border-b p-2 ${darkMode ? "text-gray-300 border-gray-700" : "text-gray-600 border-gray-300"}`}>Preço</th>
                <th className={`border-b p-2 ${darkMode ? "text-gray-300 border-gray-700" : "text-gray-600 border-gray-300"}`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index} className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}>
                  <td className="border-b p-2">{product.name}</td>
                  <td className="border-b p-2">{product.company}</td>
                  <td className="border-b p-2">{product.category}</td>
                  <td className="border-b p-2">{product.price}</td>
                  <td className="border-b p-2">{product.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-400">0 de 5 linha(s) selecionada(s).</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-md">Anterior</button>
              <button className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-md">Próximo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
