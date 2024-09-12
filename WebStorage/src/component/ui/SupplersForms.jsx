import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function SuppliersForms({ onClose }) {
  const [formData, setFormData] = useState({
    enterprise: "",
    contact: "",
    email: "",
    telephone: "",
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
      console.error('Preencha todos os campos.');
      return;
    }

    fetch("http://localhost:8081/suppliers/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao cadastrar fornecedor.");
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fornecedor cadastrado com sucesso:', data);
        onClose(); // Fecha o modal e atualiza os fornecedores no formulário de produto
      })
      .catch((error) => {
        console.error('Erro ao cadastrar fornecedor:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Empresa */}
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
          required
          className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white ${
            errors.enterprise ? 'border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
      </div>

      {/* Contato */}
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
          required
          className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white ${
            errors.contact ? 'border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
      </div>

      {/* Email */}
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
          required
          className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white ${
            errors.email ? 'border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
      </div>

      {/* Telefone */}
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
          required
          className={`mt-1 block w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-800 dark:text-white ${
            errors.telephone ? 'border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
}

export default SuppliersForms;
