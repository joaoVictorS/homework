+++markdown
# **Proposals API**

## Sumário

-   [Introdução](#introdu%C3%A7%C3%A3o)
-   [Arquitetura](#arquitetura)
-   [Instalação e Configuração](#instala%C3%A7%C3%A3o-e-configura%C3%A7%C3%A3o)
-   [Execução](#execu%C3%A7%C3%A3o)
-   [Rotas da API](#rotas-da-api)
    -   [Usuários](#usu%C3%A1rios)
    -   [Clientes](#clientes)
    -   [Propostas](#propostas)
-   [Testes](#testes)

----------

## Introdução

A **Proposals API** é uma API desenvolvida em **NestJS** que permite gerenciar propostas de usuários, clientes e administrar seus status de aprovação. A API oferece rotas para criar usuários, clientes e propostas, além de controlar a aprovação e listagem com base em diferentes status.

----------

## Arquitetura

O projeto adota uma **arquitetura modular** e **escalável**, permitindo uma fácil manutenção e extensão. Ele é organizado em três camadas principais:

1.  **Core Layer**: Responsável pelas regras de negócio. Contém as entidades, repositórios e casos de uso.
    
    -   **Exemplo**: `create-user.usecase.ts`, `create-proposal.usecase.ts`
2.  **Infra Layer**: Implementa a camada de infraestrutura. Conexão com o banco de dados via TypeORM, controladores HTTP e outros serviços.
    
    -   **Exemplo**: `typeorm/user.repository.ts`, `typeorm/proposal.repository.ts`
3.  **Modules Layer**: Define a estrutura modular do projeto, agrupando as funcionalidades de maneira lógica.
    
    -   **Exemplo**: `user.module.ts`, `proposal.module.ts`, `customer.module.ts`

### Estrutura de Diretórios

    src/
    ├── core/                  # Lógica de negócios (Casos de uso, Repositórios e Entidades)
    │   └── domain/            # Entidades e interfaces de repositório
    │   └── use-cases/         # Casos de uso que implementam a lógica
    ├── infra/                 # Infraestrutura (banco de dados, controladores HTTP)
    │   └── database/          # Repositórios que interagem com o banco via TypeORM
    │   └── http/              # Controladores e rotas
    ├── modules/               # Módulos que organizam as funcionalidades
    └── common/                # Filtros globais, interceptors, middlewares

----------

## Instalação e Configuração

### Requisitos

-   **Node.js** (>= 16.x)
-   **Yarn** ou **npm**
-   **Banco de Dados**: SQLite ou outro configurado via TypeORM

### Passos de Instalação

1.  Clone o repositório:
    
    ```bash
    git clone https://github.com/seu-usuario/proposals-api.git
    cd proposals-api
    ```
    
2.  Instale as dependências:
    
    ```bash
    yarn install
    ```
    
3.  Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
    
    ```bash
    DATABASE_URL=sqlite://./data/proposals.db
    PORT=3000
    ```
    
4.  Execute as migrações do banco de dados:
    
    ```bash
    yarn typeorm migration:run
    ```

----------

## Execução

Para rodar a aplicação localmente, execute o comando:

```bash
yarn start:dev
```

A API estará disponível no endereço `http://localhost:3000`.

----------

## Rotas da API

### Usuários

#### **POST** `/users`

Cria um novo usuário no sistema.

-   **Body**:
    
    ```json
    {
      "name": "John Doe",
      "cpf": 12159753258
    }
    ```
    
-   **Resposta de Sucesso**:
    
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "cpf": 12159753258,
      "balance": 0,
      "createdAt": "2024-10-21T10:00:00.000Z",
      "updatedAt": "2024-10-21T10:00:00.000Z"
    }
    ```

#### **GET** `/users/:id`

Busca detalhes de um usuário por seu ID.

-   **Parâmetros de Rota**:
    
    -   `id`: ID do usuário a ser buscado.
-   **Resposta de Sucesso**:

    ```json
    {
      "id": 1,
      "name": "John Doe",
      "balance": 1000,
      "createdAt": "2024-10-21T10:00:00.000Z",
      "updatedAt": "2024-10-21T10:00:00.000Z"
    }
    ```

### Clientes

#### **POST** `/customers`

Cria um novo cliente associado a um usuário.

-   **Body**:
    
    ```json
    {
      "name": "ACME Corp",
      "cpf": "12345678900",
      "userId": 1
    }
    ```
    
-   **Resposta de Sucesso**:
    
    ```json
    {
      "id": 1,
      "name": "ACME Corp",
      "cpf": "12345678900",
      "userCreator": { "id": 1, "name": "John Doe" }
    }
    ```

#### **GET** `/customers/:id`

Busca um cliente pelo ID.

-   **Parâmetros de Rota**:
    
    -   `id`: ID do cliente a ser buscado.
-   **Resposta de Sucesso**:

    ```json
    {
      "id": 1,
      "name": "ACME Corp",
      "cpf": "12345678900",
      "userCreator": { "id": 1, "name": "John Doe" }
    }
    ```

### Propostas

#### **POST** `/proposals`

Cria uma nova proposta para um cliente.

-   **Body**:
    
    ```json
    {
      "customerId": 1,
      "profit": 5000
    }
    ```
    
-   **Resposta de Sucesso**:
    
    ```json
    {
      "id": 1,
      "customer": { "id": 1, "name": "ACME Corp" },
      "userCreator": { "id": 1, "name": "John Doe" },
      "profit": 5000,
      "status": "PENDING",
      "createdAt": "2024-10-21T10:00:00.000Z",
      "updatedAt": "2024-10-21T10:00:00.000Z"
    }
    ```

#### **GET** `/proposals/:id`

Retorna uma proposta específica associada ao ID do usuário autenticado.

-   **Parâmetros de Rota**:
    
    -   `id`: ID da proposta a ser buscada.
-   **Resposta de Sucesso**:
    
    ```json
    {
      "id": 1,
      "customer": { "id": 1, "name": "ACME Corp" },
      "userCreator": { "id": 1, "name": "John Doe" },
      "profit": 5000,
      "status": "PENDING"
    }
    ```

#### **GET** `/proposals/refused`

Lista as propostas recusadas do usuário autenticado.

-   **Resposta de Sucesso**:
    
    ```json
    [
      {
        "id": 1,
        "customer": { "id": 1, "name": "ACME Corp" },
        "userCreator": { "id": 1, "name": "John Doe" },
        "profit": 5000,
        "status": "REFUSED"
      }
    ]
    ```

#### **POST** `/proposals/:proposal_id/approve`

Aprova uma proposta pendente e credita o valor no saldo do usuário.

-   **Parâmetros de Rota**:
    
    -   `proposal_id`: ID da proposta a ser aprovada.
-   **Resposta de Sucesso**:
    
    ```json
    {
      "id": 1,
      "customer": { "id": 1, "name": "ACME Corp" },
      "userCreator": { "id": 1, "name": "John Doe" },
      "profit": 5000,
      "status": "SUCCESSFUL"
    }
    ```

----------

## Testes

A API conta com **testes unitários** e **testes de integração**. Para rodar os testes, utilize os seguintes comandos:

-   **Testes Unitários**:
    
    ```bash
    npm run test
    ```

### Estrutura de Testes

Os testes estão organizados da seguinte forma:

    src/
    ├── core/
    │   └── use-cases/
    │       └── create-user.usecase.spec.ts    # Testes unitários
    ├── infra/
    │   └── http/
    │      

 └── controllers/
    │           └── user.controller.spec.ts    # Testes de integração
    └── modules/
        └── proposal/
            └── __tests__/proposal.module.spec.ts
+++