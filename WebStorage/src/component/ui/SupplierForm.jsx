/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import config from "../../config";

// eslint-disable-next-line react/prop-types
function SupplierForm({ onConfirm, supplier, onClose }) {
  // Inicializa os dados do formulário com o fornecedor selecionado ou com campos vazios
  const [formData, setFormData] = useState({
    enterprise: supplier?.enterprise || "",
    contact: supplier?.contact || "",
    email: supplier?.email || "",
    telephone: supplier?.telephone || "",
  });

  const [errors, setErrors] = useState({
    enterprise: false,
    contact: false,
    email: false,
    telephone: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Limpa erros ao preencher os campos
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      enterprise: !formData.enterprise,
      contact: !formData.contact,
      email: !formData.email,
      telephone: !formData.telephone,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.error("Preencha todos os campos.");
      return;
    }

    const endpoint = supplier
      ? `${config.apiBaseUrl}suppliers/change/${supplier.id}`
      : `${config.apiBaseUrl}suppliers/register`;

    const method = supplier ? "PUT" : "POST";

    fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Não precisa incluir o ID aqui
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            supplier
              ? "Erro ao editar fornecedor."
              : "Erro ao cadastrar fornecedor."
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(
          supplier
            ? "Fornecedor editado com sucesso:"
            : "Fornecedor cadastrado com sucesso:",
          data
        );
        onConfirm();
        window.location.reload(); 
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="enterprise"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Empresa
        </label>
        <input
          type="text"
          id="enterprise"
          name="enterprise"
          value={formData.enterprise}
          onChange={handleInputChange}
          className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white ${
            errors.enterprise
              ? "border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
      </div>

      <div>
        <label
          htmlFor="contact"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Nome do Contato
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white ${
            errors.contact
              ? "border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white ${
            errors.email
              ? "border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
      </div>

      <div>
        <label
          htmlFor="telephone"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Telefone
        </label>
        <input
          type="text"
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleInputChange}
          className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white ${
            errors.telephone
              ? "border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {supplier ? "Salvar Alterações" : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}

export default SupplierForm;
