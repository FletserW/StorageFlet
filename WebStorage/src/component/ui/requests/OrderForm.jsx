/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import config from "../../../config";
import SuppliersForms from "../SupplierForm";

function OrderForm() {
  const [formData, setFormData] = useState({
    supplierId: "",
    productId: "",
    quantity: "",
  });

  const [suppliers, setSuppliers] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Lista de todos os produtos
  const [filteredProducts, setFilteredProducts] = useState([]); // Produtos filtrados por fornecedor
  const [orderItems, setOrderItems] = useState([]); // Armazenar os itens do pedido
  const [isModalOpen, setModalOpen] = useState(false);

  // Função para abrir o modal
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Função para buscar fornecedores
  const fetchSuppliers = () => {
    fetch(`${config.apiBaseUrl}suppliers/list`)
      .then((response) => response.json())
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Erro ao buscar fornecedores:", error));
  };

  // Função para buscar todos os produtos
  const fetchAllProducts = () => {
    fetch(`${config.apiBaseUrl}products/list`)
      .then((response) => response.json())
      .then((data) => setAllProducts(data)) // Armazena todos os produtos
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  };

  // Filtrar produtos com base no fornecedor selecionado
  const filterProductsBySupplier = (supplierId) => {
    const filtered = allProducts.filter(
      (product) => product.supplierId === parseInt(supplierId, 10)
    );
    setFilteredProducts(filtered); // Atualiza a lista de produtos filtrados
  };

  useEffect(() => {
    fetchSuppliers(); // Carregar fornecedores ao montar o componente
    fetchAllProducts(); // Carregar todos os produtos ao montar o componente
  }, []);

  // Atualiza os valores do formulário conforme o usuário preenche
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Se o fornecedor for alterado, filtrar os produtos
    if (name === "supplierId") {
      filterProductsBySupplier(value);
    }
  };

  // Adicionar item ao pedido
  const handleAddItem = () => {
    const selectedProduct = filteredProducts.find(
      (product) => product.id === parseInt(formData.productId, 10)
    );

    if (selectedProduct && formData.quantity) {
      const newItem = {
        productId: selectedProduct.id,
        quantity: parseInt(formData.quantity, 10),
        productPrice: selectedProduct.price, // Preço do produto
      };

      setOrderItems([...orderItems, newItem]); // Adiciona o item ao array de itens
      setFormData({ ...formData, productId: "", quantity: "" }); // Limpa os campos de produto e quantidade
    } else {
      console.error("Produto ou quantidade inválidos");
    }
  };

  // Submeter o pedido
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.supplierId || orderItems.length === 0) {
      console.error("Fornecedor e ao menos um item são obrigatórios.");
      return;
    }

    const requestBody = {
      supplierId: parseInt(formData.supplierId, 10),
      items: orderItems, // Todos os itens adicionados ao pedido
    };

    // Envia os dados para o backend
    fetch(`${config.apiBaseUrl}requests/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Erro ao salvar pedido");
      })
      .then((data) => {
        console.log("Pedido salvo com sucesso:", data);
        setFormData({
          supplierId: "",
          productId: "",
          quantity: "",
        });
        setOrderItems([]); // Limpa os itens após o pedido ser concluído
      })
      .catch((error) => console.error("Erro ao salvar pedido:", error));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Fazer Pedido
      </h2>

      {/* Formulário de cadastro de pedido */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fornecedor */}
        <div>
          <label
            htmlFor="supplierId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Fornecedor
          </label>
          <select
            id="supplierId"
            name="supplierId"
            value={formData.supplierId}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione o fornecedor</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.enterprise}
              </option>
            ))}
          </select>
        </div>

        {/* Produto */}
        <div>
          <label
            htmlFor="productId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Produto
          </label>
          <select
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione o produto</option>
            {filteredProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantidade */}
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Quantidade
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantidade"
            value={formData.quantity}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Botões de ação */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleAddItem} // Função para adicionar item
            className="w-1/2 py-2 px-4 text-white bg-green-600 dark:bg-green-500 border border-transparent shadow-sm hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-green-400 rounded-md"
          >
            Adicionar
          </button>
          <button
            type="submit"
            className="w-1/2 py-2 px-4 text-white bg-indigo-600 dark:bg-indigo-500 border border-transparent shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-md"
          >
            Concluir Pedido
          </button>
        </div>
      </form>

      {/* Modal de cadastro de fornecedor (fora do formulário principal) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Cadastrar Fornecedor</h2>
            <SuppliersForms onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderForm;
