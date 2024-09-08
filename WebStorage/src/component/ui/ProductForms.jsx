import { useEffect, useState } from "react";
import config from "../../config";

function ProductForm() {
  const [formData, setFormData] = useState({
    nome: "",
    fornecedor: "",
    preco: "",
    valorVenda: "",
    quantidade: "",
  });

  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    fetch(`${config.apiBaseUrl}suppliers/list`)
      .then((response) => response.json())
      .then((data) => setFornecedores(data))
      .catch((error) => console.error("Erro ao buscar fornecedores:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode enviar os dados para o backend ou realizar qualquer outra ação
    console.log(formData);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Cadastrar Produto
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome do Produto */}
        <div>
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nome do Produto
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome do produto"
            value={formData.nome}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Fornecedor */}
        <div>
          <label
            htmlFor="fornecedor"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Fornecedor
          </label>
          <select
            id="fornecedor"
            name="fornecedor"
            value={formData.fornecedor}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Selecione o fornecedor</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.enterprise}
              </option>
            ))}
          </select>
        </div>

        {/* Preço */}
        <div>
          <label
            htmlFor="preco"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Preço
          </label>
          <input
            type="number"
            id="preco"
            name="preco"
            placeholder="Preço de compra"
            value={formData.preco}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Valor de Venda */}
        <div>
          <label
            htmlFor="valorVenda"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Valor de Venda
          </label>
          <input
            type="number"
            id="valorVenda"
            name="valorVenda"
            placeholder="Preço de venda(unidade)"
            value={formData.valorVenda}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Quantidade */}
        <div>
          <label
            htmlFor="quantidade"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Quantidade (no pacote)
          </label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            placeholder="Quantidade de produtos no pacote"
            value={formData.quantidade}
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
    </div>
  );
}

export default ProductForm;
