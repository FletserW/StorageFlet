/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Sidebar from "../component/ui/SideBar";
import DarkModeToggle from "../component/ui/DarkModeToggle";
import config from "../config";
import { User } from "lucide-react"; // Ícone para Fornecedores
import SupplierForm from "../component/ui/SupplierForm"; 
import SupplierTable from "../component/ui/SupplierTable"; 

function Supplier() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [suppliers, setSuppliers] = useState([]);
  const [isSupplierFormOpen, setIsSupplierFormOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch dos fornecedores do endpoint 'suppliers'
  useEffect(() => {
    fetch(`${config.apiBaseUrl}suppliers/list`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched suppliers:", data);
        setSuppliers(data);
      })
      .catch((error) => console.error("Error fetching suppliers:", error));
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  const handleAddSupplierClick = () => {
    setIsSupplierFormOpen(true); // Abrir o formulário de cadastro de fornecedor
  };

  const handleSupplierSelect = (supplier) => {
    setSelectedSupplier(supplier); // Define o fornecedor selecionado para edição
  };

  const handleCloseModal = () => {
    setIsSupplierFormOpen(false); // Fechar o formulário
  };

  // Função para atualizar a tabela de fornecedores após adicionar/editar
  const handleSupplierUpdate = () => {
    setIsSupplierFormOpen(false); // Fechar o modal

    // Recarregar os fornecedores do backend
    fetch(`${config.apiBaseUrl}suppliers`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fornecedores atualizados:", data);
        setSuppliers(data); // Atualiza o estado com os novos dados
      })
      .catch((error) => console.error("Erro ao atualizar fornecedores:", error));
  };

  // Filtra os fornecedores com base no termo de pesquisa
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.enterprise.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <User className="inline-block mr-2 dark:text-white text-gray-700" />
              Fornecedores{" "}
              {filteredSuppliers.length ? `(${filteredSuppliers.length})` : "(0)"}
            </h1>
            <DarkModeToggle
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </header>

          {/* Search Bar */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Pesquisar fornecedores..."
              value={searchTerm} // Vínculo com o estado de pesquisa
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado ao digitar
              className={`p-2 border rounded-md w-full max-w-md ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
            <button
              onClick={handleAddSupplierClick} // Abrir modal ao clicar
              className="ml-4 text-white bg-indigo-600 dark:bg-indigo-500 border border-transparent shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 px-4 py-2 rounded-md"
            >
              + Adicionar Novo
            </button>
          </div>

          {/* Tabela de Fornecedores */}
          <SupplierTable
            suppliers={filteredSuppliers}
            darkMode={darkMode}
            onRowClick={handleSupplierSelect} // Seleciona o fornecedor ao clicar na linha
            selectedSupplier={selectedSupplier} // Fornecedor selecionado
          />

          <div className="flex mt-3 justify-end">
            {selectedSupplier && (
              <button
                onClick={() => setIsSupplierFormOpen(true)} // Abre o modal para editar o fornecedor selecionado
                className="ml-4 text-white bg-indigo-600 dark:bg-indigo-500 border border-transparent shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 px-4 py-2 rounded-md"
              >
                Editar Fornecedor
              </button>
            )}
          </div>
        </div>

        {/* Modal de Cadastro/Edição de Fornecedor */}
        {isSupplierFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-4xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <SupplierForm
                onConfirm={handleSupplierUpdate} // Atualiza a tabela ao salvar o fornecedor
                supplier={selectedSupplier} // Passa o fornecedor selecionado para edição
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Supplier;
