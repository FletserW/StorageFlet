/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "../component/ui/SideBar";
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
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
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
          <Overview />
          <RecentSales />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
