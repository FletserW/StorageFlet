/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Sidebar from "../component/ui/SideBar";
import DarkModeToggle from "../component/ui/DarkModeToggle";
import config from "../config";
import { Box } from "lucide-react";
import ProductForm from "../component/ui/ProductForms";
import ProductTable from "../component/ui/ProductTable"; // Importando o componente da tabela
import ProductManager from "../component/ui/ProductManager"; // Importando o ProductManager
import ProductFormEdit from "../component/ui/ProductFormEdit";

function ProductList() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [products, setProducts] = useState([]);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isProductManagerOpen, setIsProductManagerOpen] = useState(false); // Estado para o modal de gerenciamento de produto
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para o produto selecionado
  const [searchTerm, setSearchTerm] = useState(""); // Estado para a barra de pesquisa

  // Fetch dos produtos do endpoint 'products/stocks'
  useEffect(() => {
    fetch(`${config.apiBaseUrl}products/stocks`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data from products/stocks:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  const handleAddProductClick = () => {
    setIsProductFormOpen(true); // Abrir o formulário
  };

  const handleManageProductClick = () => {
    if (selectedProduct) {
      setIsProductManagerOpen(true); // Abrir o modal de gerenciamento de produto se um produto estiver selecionado
    } else {
      console.log("Nenhum produto selecionado.");
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product); // Define o produto selecionado
  };

  const handleCloseModal = () => {
    setIsProductFormOpen(false); // Fechar o formulário
    setIsProductManagerOpen(false); // Fechar o modal de gerenciamento de produto
  };

  // Função para atualizar a tabela de produtos e fechar o modal
  const handleProductUpdate = () => {
    // Fechar o modal
    setIsProductManagerOpen(false);

    // Recarregar os produtos do backend após a atualização
    fetch(`${config.apiBaseUrl}products/stocks`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Produtos atualizados:", data);
        setProducts(data); // Atualiza o estado com os novos dados
      })
      .catch((error) => console.error("Erro ao atualizar os produtos:", error));
  };

  // Função para filtrar produtos com base no termo de pesquisa
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <Box className="inline-block mr-2 dark:text-white text-gray-700" />
              Estoque{" "}
              {filteredProducts.length ? `(${filteredProducts.length})` : "(0)"}
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
              placeholder="Pesquisar produtos..."
              value={searchTerm} // Vínculo com o estado de pesquisa
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado ao digitar
              className={`p-2 border rounded-md w-full max-w-md ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
              }`}
            />
            <button
              onClick={handleAddProductClick} // Abrir modal ao clicar
              className="ml-4 text-white bg-indigo-600 dark:bg-indigo-500 border border-transparent shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 px-4 py-2 rounded-md"
            >
              + Adicionar Novo
            </button>
          </div>
  
          {/* Tabela de Produtos usando o componente ProductTable */}
          <ProductTable
            products={filteredProducts}
            darkMode={darkMode}
            onRowClick={handleProductSelect} // Atualiza o produto selecionado ao clicar na linha
            selectedProduct={selectedProduct} // Passa o produto selecionado para a tabela
          />
  
          <div className="flex mt-3 justify-end">
            {selectedProduct && (
              <>
                <button
                  onClick={handleManageProductClick} // Abrir modal de gerenciamento ao clicar
                  className="ml-4 text-white bg-indigo-600 dark:bg-indigo-500 border border-transparent shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 px-4 py-2 rounded-md"
                >
                  Gerenciar
                </button>
                <button
                  onClick={() => setIsProductFormOpen(true)} // Abrir modal de edição ao clicar
                  className="ml-4 text-white bg-indigo-600 dark:bg-indigo-500 border border-transparent shadow-sm hover:bg-yellow-600 dark:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 px-4 py-2 rounded-md"
                >
                  Editar
                </button>
              </>
            )}
          </div>
        </div>
  
        {/* Modal de Cadastro de Produtos */}
        {isProductFormOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-4xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <ProductFormEdit product={selectedProduct} /> {/* Passa o produto selecionado para o formulário */}
            </div>
          </div>
        )}
  
        {/* Modal de Gerenciamento de Produtos */}
        {isProductManagerOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-4xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <ProductManager
                darkMode={darkMode}
                onConfirm={handleProductUpdate}
                product={selectedProduct} // Passa o produto selecionado para o modal
                entityName="stocks"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default ProductList;
