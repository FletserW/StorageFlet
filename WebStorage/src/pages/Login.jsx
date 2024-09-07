/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { Sun, Moon, Github } from "lucide-react";
import DarkModeToggle from "../component/ui/DarkModeToggle";

const Login = () => {
  // Estados para armazenar o email, senha e mensagens de erro/sucesso
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Estado para controlar o tema atual (claro ou escuro)
  const [darkMode, setDarkMode] = useState(() => {
    // Função que carrega o valor do Local Storage ao iniciar
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false; // Se houver um tema salvo, usa ele, senão usa o claro
  });

  // Efeito para aplicar a classe 'dark' no body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Salva o estado atual no localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Função que alterna entre o modo claro e escuro
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  // Função para lidar com o submit do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Envia os dados do login para a API
    try {
      const response = await fetch(`${config.apiBaseUrl}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Envia email e senha no corpo da requisição
      });

      // Verifica o status da resposta
      if (response.ok) {
        const data = await response.text(); // Supondo que a API retorna um texto simples
        setMessage(`Sucesso: ${data}`);
        navigate("/dashboard");
      } else {
        const errorData = await response.text();
        setMessage(`Erro: ${errorData}`);
      }
    } catch (error) {
      setMessage("Erro ao conectar-se à API.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {/* Usando o componente de Dark Mode no canto superior direito */}
      <div className="absolute top-4 right-4">
      <div className="absolute top-4 right-4">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 dark:text-gray-300 rounded-lg shadow-md">
        <div className="text-sm text-right">
          <a
            href="/signup"
            className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
          >
            sign up
          </a>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Acessar
        </h2>

        {/* Exibe mensagens de erro/sucesso */}
        {message && (
          <p className="text-center text-sm text-red-500 dark:text-red-400">
            {message}
          </p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:focus:ring-indigo-400"
              required
              value={email} // Controlado pelo estado
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:focus:ring-indigo-400"
              required
              value={password} // Controlado pelo estado
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-200"
              >
                Lembrar-me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 mb-2 text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              Entrar
            </button>

            {/* Linha separadora com "continue com" */}
            <div className="flex items-center my-4">
              {/* Linha à esquerda */}
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>

              {/* Texto central com alternância de cores */}
              <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
                Continue com
              </span>

              {/* Linha à direita */}
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
            </div>

            {/* Botões de Login Social */}
            <div className="space-y-2">
              {/* Botão do Google */}
              <button
                onClick={openModal}
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none"
              >
                {/* Ícone do Google */}
                <svg
                  className="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="25"
                  height="25"
                  viewBox="0 0 50 50"
                >
                  <path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z"></path>
                </svg>
                Continuar com Google
              </button>

              {/* Botão do GitHub */}
              <button
                onClick={openModal}
                type="button"
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none"
              >
                <Github className="mr-2" size={24} />
                Continuar com GitHub
              </button>
            </div>
          </div>
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-opacity-70">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Em Breve
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Esta funcionalidade estará disponível em breve.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-4 px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
