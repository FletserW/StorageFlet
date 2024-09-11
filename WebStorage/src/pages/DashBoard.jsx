/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "../component/ui/SideBar";
import config from "../config";
import DarkModeToggle from "../component/ui/DarkModeToggle";
import { Card } from "../component/ui/dashboard/Card";
import { Overview } from "../component/ui/dashboard/Overview";
import { TopSales } from "../component/ui/dashboard/TopSales";

function DashBoard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [walletData, setWalletData] = useState({ gainValue: 0, spentValue: 0, lossValue: 0 });
  const [previousWalletData, setPreviousWalletData] = useState({ gainValue: 0, spentValue: 0, lossValue: 0 });
  const [percentage, setPercentage] = useState({ gain: 0, spent: 0, loss: 0 });
  const [color, setColor] = useState({ gain: "", spent: "", loss: "" });

  // Novo estado para controlar a seleção do mês e ano
  const [selectedMonthYear, setSelectedMonthYear] = useState(() => {
    const currentDate = new Date();
    return `${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  });

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

  // Função para buscar os dados da Wallet do mês atual e do mês anterior com base na seleção do usuário
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const selectedDateParts = selectedMonthYear.split("-");
        const selectedMonth = parseInt(selectedDateParts[0], 10);
        const selectedYear = parseInt(selectedDateParts[1], 10);

        const previousMonthYear = `${selectedMonth === 1 ? 12 : selectedMonth - 1}-${selectedMonth === 1 ? selectedYear - 1 : selectedYear}`;

        const response = await fetch(`${config.apiBaseUrl}wallets/list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const currentMonthData = data.find((record) => record.monthYear === selectedMonthYear);
        const previousMonthData = data.find((record) => record.monthYear === previousMonthYear);

        if (currentMonthData) {
          setWalletData({
            gainValue: currentMonthData.gainValue,
            spentValue: currentMonthData.spentValue,
            lossValue: currentMonthData.lossValue,
          });
        }

        if (previousMonthData) {
          setPreviousWalletData({
            gainValue: previousMonthData.gainValue,
            spentValue: previousMonthData.spentValue,
            lossValue: previousMonthData.lossValue,
          });
        }

        // Calcular as porcentagens com base nos valores do mês anterior
        const gainPercentage =
          previousMonthData && previousMonthData.gainValue > 0
            ? ((currentMonthData.gainValue - previousMonthData.gainValue) / previousMonthData.gainValue) * 100
            : 0;
        const spentPercentage =
          previousMonthData && previousMonthData.spentValue > 0
            ? ((currentMonthData.spentValue - previousMonthData.spentValue) / previousMonthData.spentValue) * 100
            : 0;
        const lossPercentage =
          previousMonthData && previousMonthData.lossValue > 0
            ? ((currentMonthData.lossValue - previousMonthData.lossValue) / previousMonthData.lossValue) * 100
            : 0;

        // Definir cores com base no valor da porcentagem
        setPercentage({
          gain: gainPercentage.toFixed(1),
          spent: spentPercentage.toFixed(1),
          loss: lossPercentage.toFixed(1),
        });

        setColor({
          gain: gainPercentage > 0 ? "text-green-500" : gainPercentage < 0 ? "text-red-500" : "text-blue-500",
          spent: spentPercentage > 0 ? "text-green-500" : spentPercentage < 0 ? "text-red-500" : "text-blue-500",
          loss: lossPercentage > 0 ? "text-green-500" : lossPercentage < 0 ? "text-red-500" : "text-blue-500",
        });
      } catch (error) {
        console.error("Erro ao buscar dados da wallet:", error);
      }
    };

    fetchWalletData();
  }, [selectedMonthYear]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} flex`}>
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </header>

        {/* Month/Year Selector */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="month"
            value={`${selectedMonthYear.split("-")[1]}-${selectedMonthYear.split("-")[0].padStart(2, "0")}`}
            onChange={(e) => {
              const [year, month] = e.target.value.split("-");
              setSelectedMonthYear(`${parseInt(month)}-${year}`);
            }}
            className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          <Card
            title="Lucro"
            value={`$${walletData.gainValue.toFixed(2)}`}
            percentage={`${percentage.gain > 0 ? "+" : ""}${percentage.gain}%`}
            percentageColor={color.gain}
          />
          <Card
            title="Gastos"
            value={`$${walletData.spentValue.toFixed(2)}`}
            percentage={`${percentage.spent > 0 ? "+" : ""}${percentage.spent}%`}
            percentageColor={color.spent}
          />
          <Card
            title="Prejuízo"
            value={`$${walletData.lossValue.toFixed(2)}`}
            percentage={`${percentage.loss > 0 ? "+" : ""}${percentage.loss}%`}
            percentageColor={color.loss}
          />
        </div>

        {/* Overview and Recent Sales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Overview />
          <TopSales selectedMonthYear={selectedMonthYear} />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
