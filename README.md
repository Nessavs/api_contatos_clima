# API de Contatos com Hapi.js

Uma API RESTful para gerenciar uma agenda de contatos, construída com Node.js, Hapi.js e MongoDB. O projeto inclui funcionalidades avançadas como exclusão lógica (soft delete), filtros de busca e integração com a API HG Brasil Weather para fornecer sugestões inteligentes baseadas na cidade do contato.

## ✨ Features

- **CRUD Completo:** Crie, liste, exiba, atualize e exclua contatos.
- **Validação de Dados:** Utiliza Joi para garantir a integridade dos dados de entrada.
- **Exclusão Lógica:** Contatos não são permanentemente removidos, permitindo recuperação.
- **Busca com Filtros:** Permite filtrar a lista de contatos por nome, cidade, email, etc.
- **Integração com API Externa:** Busca o clima atual na cidade do contato e oferece sugestões personalizadas.
- **Tolerância a Falhas:** Lida de forma graciosa com falhas na API externa, sem interromper o serviço.
- **Documentação Interativa:** Documentação de rotas feitas no Postman, importe o documento dentro da pasta Postman

## 🏛️ Arquitetura

O projeto segue uma arquitetura em camadas para a separação de responsabilidades:

- **`routes`:** Define os endpoints da API, métodos HTTP e regras de validação.
- **`handlers` (Controllers):** Recebem as requisições, chamam os serviços apropriados e formatam a resposta.
- **`services`:** Contêm a lógica de negócio principal e interagem com o banco de dados.
- **`models`:** Definem os schemas de dados usando Mongoose.
- **`schemas`:** Definem as regras de validação de entrada usando Joi.
- **`utils`:** Módulos auxiliares, como a lógica para chamar a API de clima.

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js
- **Framework:** Hapi.js
- **Banco de Dados:** MongoDB (com Mongoose)
- **Containerização:** Docker (Docker Compose)
- **Validação:** Joi

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Passos para Instalação

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-seu-repositorio>
    cd <nome-da-pasta-do-projeto>
    ```

2.  **Crie o ficheiro de variáveis de ambiente:**
    Copie o ficheiro `.env.example` para um novo ficheiro chamado `.env`.
    ```bash
    cp .env.example .env
    ```
    Abra o ficheiro `.env` e preencha a sua chave da API da HG Brasil:
    ```env
    # .env
    HOST=localhost
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/contatos_db
    HG_BRASIL_API_KEY=SUA_CHAVE_AQUI
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o banco de dados com Docker:**
    ```bash
    docker-compose up -d
    ```

5.  **Inicie o servidor da API:**
    ```bash
    npm run dev
    ```

O servidor estará a rodar em `http://localhost:3000`.

## 📖 Documentação da API

Com o servidor a rodar, a documentação interativa do Swagger está disponível em:

**[http://localhost:3000/documentation](http://localhost:3000/documentation)**

## 🧪 Observações:

Na API do tempo, mesmo colocando uma cidade que não existe, a API puxa um default (não sei de onde), conseguindo burlar meus retornos de erro.# api_contatos_clima
