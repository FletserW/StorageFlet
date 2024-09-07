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
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      } bg-gray-800 h-screen p-4 transition-width duration-300 relative dark:bg-gray-900`}
    >
      {/* Logo and Site Name */}
      <div className="flex items-center mb-8">
        <img
          src="logo.png"
          alt="Logo"
          className={`${isSidebarOpen ? "block" : "hidden"} w-10 h-10`}
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
          <Home className="mr-2" /> {isSidebarOpen && "Dashboard"}
        </a>
        <a
          href="/estoque"
          className="flex items-center text-gray-300 hover:text-white"
        >
          <Box className="mr-2" /> {isSidebarOpen && "Estoque"}
        </a>
        <a
          href="/freezer"
          className="flex items-center text-gray-300 hover:text-white"
        >
          <Thermometer className="mr-2" /> {isSidebarOpen && "Freezer"}
        </a>
        <a
          href="/fornecedores"
          className="flex items-center text-gray-300 hover:text-white"
        >
          <Truck className="mr-2" /> {isSidebarOpen && "Fornecedores"}
        </a>
        <a
          href="/configuracoes"
          className="flex items-center text-gray-300 hover:text-white"
        >
          <Settings className="mr-2" /> {isSidebarOpen && "Configurações"}
        </a>
        <a
          href="/login"
          className="flex items-center text-gray-300 hover:text-white"
        >
          <LogOut className="mr-2" /> {isSidebarOpen && "Sair"}
        </a>
      </nav>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute bottom-4 left-2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {isSidebarOpen ? <ArrowLeft /> : <ArrowRight />}
      </button>
    </div>
  );
}

export default Sidebar;
