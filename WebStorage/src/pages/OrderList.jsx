/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Sidebar from "../component/ui/SideBar";
import DarkModeToggle from "../component/ui/DarkModeToggle";
import config from "../config";
import { ClipboardPenLine } from "lucide-react";
import OrderForm from "../component/ui/requests/OrderForm";
import OrderCard from "../component/ui/requests/OrderCard";
import ProductChecklist from "../component/ui/requests/ProductCheckList";
function OrderList() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [orders, setOrders] = useState([]);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isProductChecklistOpen, setIsProductChecklistOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchDate, setSearchDate] = useState("");

  // Fetch dos pedidos do endpoint 'orders'
  useEffect(() => {
    fetch(`${config.apiBaseUrl}requests/list`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data from orders:", data);
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Função para filtrar pedidos por data
  const filteredOrders = orders.filter((order) =>
    order.date.includes(searchDate)
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  const handleAddOrderClick = () => {
    setIsOrderFormOpen(true);
  };

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setIsProductChecklistOpen(true);
  };

  const handleCloseModal = () => {
    setIsOrderFormOpen(false);
    setIsProductChecklistOpen(false);
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        className={`min-h-screen flex ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div
          className={`flex-1 p-4 md:p-8 transition-all duration-300 ${
            isSidebarOpen ? "ml-14" : "ml-1"
          } ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
        >
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-xl md:text-3xl font-bold">
              <ClipboardPenLine className="inline-block mr-2 dark:text-white text-gray-700" />
              Pedidos {filteredOrders.length ? `(${filteredOrders.length})` : "(0)"}
            </h1>
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </header>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className={`p-2 border rounded-md w-full max-w-md ${
                darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
              }`}
            />
            <button
              onClick={handleAddOrderClick}
              className="mt-4 md:mt-0 text-white bg-indigo-600 dark:bg-indigo-500 border border-transparent shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 px-4 py-2 rounded-md"
            >
              + Adicionar Novo Pedido
            </button>
          </div>

          {/* Cards de Pedidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onSelect={() => handleOrderSelect(order)}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>

        {/* Modal de Cadastro de Pedidos */}
        {isOrderFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-4xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <OrderForm onClose={handleCloseModal} />
            </div>
          </div>
        )}

        {/* Modal de Checklist de Produtos */}
        {isProductChecklistOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-4xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <ProductChecklist
                order={selectedOrder}
                darkMode={darkMode}
                onClose={handleCloseModal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderList;
