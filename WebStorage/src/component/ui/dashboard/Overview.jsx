// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import config from "../../../config";

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function Overview() {
  const [monthlyGainData, setMonthlyGainData] = useState([]);

  useEffect(() => {
    // Função para buscar os dados de ganho mensal da Wallet
    const fetchMonthlyGainData = async () => {
      try {
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

        // Extrair dados de gain_value por mês
        const gainByMonth = Array(12).fill(0); // Inicia um array com 12 zeros, um para cada mês

        data.forEach((record) => {
          const [month, year] = record.monthYear.split("-");
          const monthIndex = parseInt(month, 10) - 1; // Mês é base 0 no array
          if (year === new Date().getFullYear().toString()) {
            gainByMonth[monthIndex] = record.gainValue;
          }
        });

        setMonthlyGainData(gainByMonth);
      } catch (error) {
        console.error("Erro ao buscar dados da wallet:", error);
      }
    };

    fetchMonthlyGainData();
  }, []);

  // Dados do gráfico de barras
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Lucro Mensal (Gain Value)",
        data: monthlyGainData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Opções de configuração do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Lucro Mensal no Ano Atual",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Overview</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
