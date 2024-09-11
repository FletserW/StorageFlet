/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import config from "../../../config";

// eslint-disable-next-line react/prop-types
export function TopSales({ selectedMonthYear }) {
  const [topSales, setTopSales] = useState([]);

  useEffect(() => {
    const fetchTopSales = async () => {
      try {
        const response = await fetch(
          `${config.apiBaseUrl}sales/top-sales?monthYear=${selectedMonthYear}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        setTopSales(data);
      } catch (error) {
        console.error("Erro ao buscar os produtos mais vendidos:", error);
      }
    };

    fetchTopSales();
  }, [selectedMonthYear]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Mais vendidos</h2>
      <ul>
        {topSales.length > 0 ? (
          topSales.map(([productName, totalSales], index) => (
            <li key={index} className="flex justify-between mb-3">
              <div>
                <p>{productName}</p>
                <p className="text-sm text-gray-400">Total vendido: {totalSales}</p>
              </div>
            </li>
          ))
        ) : (
          <p>Nenhum produto vendido neste mês.</p>
        )}
      </ul>
    </div>
  );
}
