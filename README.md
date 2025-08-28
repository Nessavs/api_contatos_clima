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
- **Testes**: Mocha, Chai, Sinon

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


## 📖 Documentação e Testes da API
A documentação completa e interativa da API foi criada como uma Coleção do Postman.

Localização: O ficheiro de exportação da coleção (API de Contatos.postman_collection.json) encontra-se na pasta /postman do projeto.

Como Usar: Importe este ficheiro no seu Postman para ter acesso a todas as rotas, com exemplos de body e descrições para cada endpoint.

## 🧪 Executando os Testes Automatizados
O projeto conta com uma suíte de testes unitários e de integração para garantir a qualidade e o correto funcionamento do código.
Para executar todos os testes, utilize o comando:
```bash
npm test
```

## ⚠️ Observações Importantes

A API externa (HG Brasil Weather) possui um comportamento específico: ao receber o nome de uma cidade que não existe, em vez de retornar um erro, ela retorna os dados de um local padrão (geralmente a capital do estado ou do país).

A API já trata este caso: a lógica interna deteta esta resposta padrão (from: 'default') e a converte numa mensagem de erro controlada, garantindo que o utilizador nunca receba uma previsão do tempo incorreta. Este comportamento é validado nos testes automatizados.

## Arquitetura Escolhida: Camadas (Layered Architecture)
A arquitetura do projeto foi estruturada em Camadas (Layered Architecture). Este padrão foi escolhido por promover uma clara separação de responsabilidades, o que resulta num código mais organizado, testável e fácil de expandir.

Cada camada possui um papel bem definido:

routes: A camada mais externa, que define os endpoints da API, os métodos HTTP e as regras de validação de entrada.

handlers (Controladores): Recebem as requisições, orquestram as chamadas para os serviços e formatam a resposta final para o cliente.

services (Serviços): Onde reside a lógica de negócio principal. Esta camada executa as operações, validações de negócio e interage com a camada de dados.

models (Modelos): A camada de acesso a dados, responsável por definir a estrutura (schema) e interagir diretamente com o banco de dados MongoDB.

utils (Utilitários): Módulos auxiliares com lógica reutilizável, como a função para chamar a API de clima.

**Vantagens desta arquitetura:**

Manutenção: Alterações na lógica de negócio são concentradas na camada de serviço, minimizando o impacto em outras partes do sistema.

Testabilidade: Cada camada pode ser testada de forma independente. É possível testar um serviço sem a necessidade de um servidor HTTP a rodar.

Escalabilidade: Novas funcionalidades podem ser adicionadas de forma consistente, seguindo a mesma estrutura de pastas e camadas.

## Padrões Adotados
Além da arquitetura em camadas, o projeto adota os seguintes padrões e boas práticas:

API RESTful: A API utiliza os verbos HTTP de forma semântica (GET, POST, PUT, DELETE) e estrutura as URLs em torno de recursos (/contatos), seguindo os princípios REST.

Variáveis de Ambiente (.env): Configurações sensíveis ou que variam entre ambientes (desenvolvimento, produção) são externalizadas, aumentando a segurança e a flexibilidade da aplicação.

Containerização com Docker: O uso do Docker e docker-compose garante um ambiente de desenvolvimento consistente e replicável, eliminando problemas de configuração de banco de dados entre diferentes máquinas.
