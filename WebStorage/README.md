# Frontend do Sistema de Gestão de Estoque

Este repositório contém o frontend para o sistema de gestão de estoque, desenvolvido com React e Tailwind CSS. Ele foi projetado para funcionar com a API do sistema, que lida com fornecedores, produtos e pedidos.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção da interface de usuário.
- **Tailwind CSS**: Framework CSS para estilização e design responsivo.
- **React Router DOM**: Biblioteca para roteamento e navegação.
- **Lucide Icons**: Biblioteca de ícones para uma interface moderna.

## Funcionalidades

- **Sidebar**: Navegação lateral com links para diferentes seções do sistema (Dashboard, Estoque, Freezer, Fornecedores, Configurações, Login).
- **Dark Mode**: Alternância entre modos claro e escuro.
- **Tela de Fornecedores**:
  - **Tabela de Fornecedores**: Exibição e pesquisa de fornecedores.
  - **Formulário de Cadastro/Editoração**: Adiciona e edita fornecedores.
- **Tela de Produtos**:
  - **Tabela de Produtos**: Exibição dos produtos com detalhes como nome, fornecedor, preço e quantidade.
  - **Formulário de Cadastro/Editoração de Produtos**: Adiciona e edita produtos.
- **Tela de Dashboard**: Exibe gráficos e resumo das informações do sistema.

## Estrutura do Projeto

- **src/**: Contém o código-fonte do frontend.
  - **components/**: Componentes reutilizáveis, como Sidebar, SupplierTable, ProductTable.
  - **ui/**: Componentes de interface do usuário, como DarkModeToggle, SupplierForm.
  - **pages/**: Páginas do aplicativo, como Supplier, Product, Dashboard.
- **config.js**: Configurações do aplicativo, incluindo URL da API.
- **public/**: Arquivos estáticos como o index.html.

