# Sistema de Gestão de Estoque, Fornecedores e Pedidos
<img src="./WebStorage/src/assets/logo.png" alt="Logo do Projeto" width="200"/>

## Descrição
Este projeto é um sistema de gestão de estoque com funcionalidades para gerenciar fornecedores, pedidos e produtos. Ele foi desenvolvido com **React** no frontend e **Spring Boot** no backend para garantir uma interface moderna e uma API robusta.

## Funcionalidades
- Cadastro de produtos.
- Controle de estoque (adicionar, vender, perder itens).
- Gestão de fornecedores.
- Visualização de pedidos.
- Dashboard com relatórios de lucro e movimentação de produtos.
- Sistema de autenticação (se aplicável).

## Tecnologias Utilizadas
### Frontend
- React
- TailwindCSS
- Lucide React (para ícones)
- Fetch (para requisições HTTP)

### Backend
- Spring Boot
- JPA (Java Persistence API)
- Hibernate
- Spring Data JPA
- Spring Security 
- Lombok 

### Banco de Dados
- MySQL

## Requisitos
Para rodar o projeto localmente, você precisará de:
- **Node.js** v14+
- **Java** 11+
- **Banco de Dados** MySQL

## Instalação e Execução

### 1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```
### 2. Configure o backend
#### 1. Navegue ate o diretorio do backend:
```bash
cd ApiStorage
```
#### 2. Instale as dependências e rode a aplicação:
```bash
./mvnw spring-boot:run
```
#### 3. Certifique-se de que o banco de dados está configurado corretamente no arquivo application.properties do Spring Boot::
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/storageflet
spring.datasource.username=root
spring.datasource.password=

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

```
### 3. Configurações do Frontend
#### 1. Navegue ate o diretório do frontend:
```bash
cd WebStorage
```
#### 2. Instale as dependências:
```bash
npm install
 //Css dinamico
 npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
 npx tailwindcss init
 npm install react-scripts@latest 
 //Icons
 npm install lucide-react
 npm install lucide-react-native
 //Trocar de paginas
 npm i react-router-dom
 //Formularios
 npm install react-hook-form
 //Validar Dados
 npm i validator
 //Tabela em colunas
 npm install react-chartjs-2 chart.js
```
#### 3. Rode a Aplicação:
```bash
npm start
```
