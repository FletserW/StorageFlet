/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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

import DarkModeToggle from "../component/ui/DarkModeToggle";
import { Card } from "../component/dashboard/Card";
import { Overview } from "../component/dashboard/Overview";
import { RecentSales } from "../component/dashboard/RecentSales";

function DashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Estado para controlar o tema atual (claro ou escuro)
  const [darkMode, setDarkMode] = useState(() => {
    // Função que carrega o valor do Local Storage ao iniciar
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false; // Se houver um tema salvo, usa ele, senão usa o claro
  });

  // Efeito para aplicar a classe 'dark' no body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Salva o estado atual no localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Função que alterna entre o modo claro e escuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } flex`}
    >
      {/* Sidebar */}
        <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 h-screen p-4 transition-width duration-300 dark:bg-gray-900`}
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
          {isSidebarOpen ? "<" : ">"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </header>

        {/* Date Range */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-400">Jan 20, 2023 - Feb 09, 2023</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          <Card />
          <Card />
          <Card />
        </div>

        {/* Overview and Recent Sales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Overview Graph Placeholder */}
          <Overview />

          {/* Recent Sales */}
          <RecentSales />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
