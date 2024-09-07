// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Sidebar from "../component/ui/SideBar";
import DarkModeToggle from "../component/ui/DarkModeToggle";
import { Thermometer } from "lucide-react"

function Freezer() {
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
    { name: "Itaipava 600ml", company: "Itaipava", selling_price: "$7,80", price: "$110", amount: "12" },
    { name: "Skol 350ml", company: "Skol", selling_price: "$4,50", price: "$60", amount: "24" },
    { name: "Brahma 500ml", company: "Brahma", selling_price: "$6,20", price: "$85", amount: "18" },
    { name: "Antarctica 600ml", company: "Antarctica", selling_price: "$7,00", price: "$95", amount: "15" },
    { name: "Budweiser 330ml", company: "Budweiser", selling_price: "$5,00", price: "$70", amount: "20" },
    { name: "Itaipava 600ml", company: "Itaipava", selling_price: "$7,80", price: "$110", amount: "12" },
    { name: "Skol 350ml", company: "Skol", selling_price: "$4,50", price: "$60", amount: "24" },
    { name: "Brahma 500ml", company: "Brahma", selling_price: "$6,20", price: "$85", amount: "18" },
    { name: "Antarctica 600ml", company: "Antarctica", selling_price: "$7,00", price: "$95", amount: "15" },
    { name: "Budweiser 330ml", company: "Budweiser", selling_price: "$5,00", price: "$70", amount: "20" }
    // Adicione mais produtos aqui para testar o scroll
    // Adicione mais produtos aqui para testar o scroll
  ];

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className={`flex-1 p-4 md:p-8 transition-all duration-300 ${isSidebarOpen ? "ml-14" : "ml-1"} ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold"><Thermometer className="mr-2 dark:text-white text-gray-700" />Freezer ({products.length})</h1>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </header>

          {/* Search Bar */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              className={`p-2 border rounded-md w-full max-w-md ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
            />
            <button className="ml-4 text-white bg-indigo-600 dark:bg-indigo-500 border border-transparent shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 px-4 py-2 rounded-md">
              + Adicionar Novo
            </button>
          </div>

          {/* Scrollable Product Table */}
          <div className="overflow-y-auto max-h-96">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className={`border-b p-2 ${darkMode ? "text-gray-300 border-gray-700" : "text-gray-600 border-gray-300"}`}>Nome</th>
                  <th className={`border-b p-2 ${darkMode ? "text-gray-300 border-gray-700" : "text-gray-600 border-gray-300"}`}>Empresa</th>
                  <th className={`border-b p-2 ${darkMode ? "text-gray-300 border-gray-700" : "text-gray-600 border-gray-300"}`}>Valor (Venda)</th>
                  <th className={`border-b p-2 ${darkMode ? "text-gray-300 border-gray-700" : "text-gray-600 border-gray-300"}`}>Preço</th>
                  <th className={`border-b p-2 ${darkMode ? "text-gray-300 border-gray-700" : "text-gray-600 border-gray-300"}`}>Qtd</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index} className={darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}>
                    <td className="border-b p-2">{product.name}</td>
                    <td className="border-b p-2">{product.company}</td>
                    <td className="border-b p-2">{product.selling_price}</td>
                    <td className="border-b p-2">{product.price}</td>
                    <td className="border-b p-2">{product.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Freezer;
