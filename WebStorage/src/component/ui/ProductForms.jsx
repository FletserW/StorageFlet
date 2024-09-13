import { useEffect, useState } from "react";
import config from "../../config";
import SuppliersForms from "./SupplierForm";

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    supplierId: "",
    price: "",
    sellingPrice: "",
    amount: "",
  });

  const [suppliers, setSuppliers] = useState([]);
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

  useEffect(() => {
    fetchSuppliers(); // Carregar fornecedores ao montar o componente
  }, []);

  // Atualiza os valores do formulário conforme o usuário preenche
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função de submissão do formulário de produtos
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.supplierId) {
      console.error("Nome do produto e fornecedor são obrigatórios.");
      return;
    }

    const requestBody = {
      name: formData.name,
      supplierId: parseInt(formData.supplierId, 10),
      price: parseFloat(formData.price),
      sellingPrice: parseFloat(formData.sellingPrice),
      amount: parseInt(formData.amount, 10),
    };

    // Envia os dados para o backend
    fetch(`${config.apiBaseUrl}products/register`, {
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
        throw new Error("Erro ao salvar produto");
      })
      .then((data) => {
        console.log("Produto salvo com sucesso:", data);
        setFormData({
          name: "",
          supplierId: "",
          price: "",
          sellingPrice: "",
          amount: "",
        });
        window.location.reload();
      })
      .catch((error) => console.error("Erro ao salvar produto:", error));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Cadastrar Produto
      </h2>

      {/* Formulário de cadastro de produto */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome do Produto */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nome do Produto
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nome do produto"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fornecedor e botão + */}
        <div className="flex items-center">
          <div className="flex-grow">
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

          {/* Botão + para abrir o modal */}
          <button
            type="button"
            onClick={handleOpenModal}
            className="ml-2 mt-6 px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            +
          </button>
        </div>

        {/* Preço de Compra */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Preço
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Preço de compra"
            value={formData.price}
            onChange={handleInputChange}
            required
            step="0.01"
            className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Valor de Venda */}
        <div>
          <label
            htmlFor="sellingPrice"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Valor de Venda
          </label>
          <input
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Preço de venda (unidade)"
            value={formData.sellingPrice}
            onChange={handleInputChange}
            required
            step="0.01"
            className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Quantidade */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Quantidade (no pacote)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Quantidade de produtos no pacote"
            value={formData.amount}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Botão de Submeter */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-indigo-600 dark:bg-indigo-500 border border-transparent shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-md"
          >
            Cadastrar Produto
          </button>
        </div>
      </form>

      {/* Modal de cadastro de fornecedor (fora do formulário principal) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Cadastrar Fornecedor</h2>
            <SuppliersForms
              onClose={() => {
                handleCloseModal();
                fetchSuppliers(); // Atualiza a lista de fornecedores após cadastro
              }}
            />
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductForm;
