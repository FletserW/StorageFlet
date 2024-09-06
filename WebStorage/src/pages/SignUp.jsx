import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import config from "../config";
import DarkModeToggle from "../component/ui/DarkModeToggle";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchPassword = watch("password");

  const onSubmit = (data) => {
    // Usando fetch para enviar os dados para o backend
    fetch(`${config.apiBaseUrl}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Usuário criado:", result);
        alert("Usuário criado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao criar usuário:", error);
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="absolute top-4 right-4">
          <DarkModeToggle />
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Criar Conta
        </h2>

        {/* Nome */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome
          </label>
          <input
            className={`mt-1 block w-full px-3 py-2 border ${
              errors?.name
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white focus:outline-none dark:focus:border-none`}
            type="text"
            placeholder="Seu nome"
            {...register("name", { required: true })}
          />
          {errors?.name?.type === "required" && (
            <p className="mt-1 text-sm text-red-500">Nome é obrigatório.</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            E-mail
          </label>
          <input
            className={`mt-1 block w-full px-3 py-2 border ${
              errors?.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white focus:outline-none dark:focus:border-none`}
            type="email"
            placeholder="Seu e-mail"
            {...register("email", {
              required: true,
              validate: (value) => isEmail(value),
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="mt-1 text-sm text-red-500">E-mail é obrigatório.</p>
          )}
          {errors?.email?.type === "validate" && (
            <p className="mt-1 text-sm text-red-500">E-mail inválido.</p>
          )}
        </div>

        {/* Senha */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Senha
          </label>
          <input
            className={`mt-1 block w-full px-3 py-2 border ${
              errors?.password
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white focus:outline-none dark:focus:border-none`}
            type="password"
            placeholder="Sua senha"
            {...register("password", { required: true, minLength: 7 })}
          />
          {errors?.password?.type === "required" && (
            <p className="mt-1 text-sm text-red-500">Senha é obrigatória.</p>
          )}
          {errors?.password?.type === "minLength" && (
            <p className="mt-1 text-sm text-red-500">
              A senha precisa ter pelo menos 7 caracteres.
            </p>
          )}
        </div>

        {/* Confirmação da Senha */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirmação de Senha
          </label>
          <input
            className={`mt-1 block w-full px-3 py-2 border ${
              errors?.passwordConfirmation
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white focus:outline-none dark:focus:border-none`}
            type="password"
            placeholder="Repita sua senha"
            {...register("passwordConfirmation", {
              required: true,
              validate: (value) => value === watchPassword,
            })}
          />
          {errors?.passwordConfirmation?.type === "required" && (
            <p className="mt-1 text-sm text-red-500">
              Confirmação de senha é obrigatória.
            </p>
          )}
          {errors?.passwordConfirmation?.type === "validate" && (
            <p className="mt-1 text-sm text-red-500">
              As senhas não coincidem.
            </p>
          )}
        </div>

        {/* Termos de Privacidade */}
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
              {...register("privacyTerms", {
                validate: (value) => value === true,
              })}
            />
            <label className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Eu concordo com os termos de privacidade.
            </label>
          </div>
          {errors?.privacyTerms?.type === "validate" && (
            <p className="mt-1 text-sm text-red-500">
              Você deve concordar com os termos.
            </p>
          )}
        </div>

        {/* Botão de Registro */}
        <div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Criar Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
