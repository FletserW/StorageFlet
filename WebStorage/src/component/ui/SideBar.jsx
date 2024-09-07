import {
  ArrowLeft,
  ArrowRight,
  Home,
  Box,
  Thermometer,
  Truck,
  Settings,
  LogOut,
} from "lucide-react";

// eslint-disable-next-line react/prop-types
function Sidebar({ isSidebarOpen, toggleSidebar }) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed z-30 h-full top-0 left-0 transform transition-all duration-300 
          ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-16"} 
          bg-gray-800 p-4 dark:bg-gray-950 md:translate-x-0 md:w-64 md:h-screen md:static md:relative 
          ${isSidebarOpen ? "md:w-64" : "md:w-16"}`}
      >
        {/* Logo and Site Name */}
        <div className="flex items-center mb-8">
          <img
            src="logo.png"
            alt="Logo"
            className={`w-10 h-10 ${isSidebarOpen ? "block" : "hidden md:block"}`}
          />
          {isSidebarOpen && (
            <span className="text-lg font-bold ml-2 text-white">
              Storage Flet
            </span>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <a
            href="/dashboard"
            className="flex items-center text-gray-300 hover:text-white"
          >
            <Home className="mr-2 text-white" /> {isSidebarOpen && "Dashboard"}
          </a>
          <a
            href="/estoque"
            className="flex items-center text-gray-300 hover:text-white"
          >
            <Box className="mr-2 text-white" /> {isSidebarOpen && "Estoque"}
          </a>
          <a
            href="/freezer"
            className="flex items-center text-gray-300 hover:text-white"
          >
            <Thermometer className="mr-2 text-white" /> {isSidebarOpen && "Freezer"}
          </a>
          <a
            href="/fornecedores"
            className="flex items-center text-gray-300 hover:text-white"
          >
            <Truck className="mr-2 text-white" /> {isSidebarOpen && "Fornecedores"}
          </a>
          <a
            href="/configuracoes"
            className="flex items-center text-gray-300 hover:text-white"
          >
            <Settings className="mr-2 text-white" /> {isSidebarOpen && "Configurações"}
          </a>
          <a
            href="/login"
            className="flex items-center text-gray-300 hover:text-white"
          >
            <LogOut className="mr-2 text-white" /> {isSidebarOpen && "Sair"}
          </a>
        </nav>

        {/* Toggle Button for Desktop */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 hidden md:block"
        >
          {isSidebarOpen ? <ArrowLeft /> : <ArrowRight />}
        </button>
      </div>

      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-40 bg-gray-700 p-2 rounded-full hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 md:hidden"
      >
        {isSidebarOpen ? <ArrowLeft /> : <ArrowRight />}
      </button>
    </>
  );
}

export default Sidebar;
