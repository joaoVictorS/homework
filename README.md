# API & Frontend - Propostas e Clientes

Este repositório contém o **backend** e **frontend** de uma aplicação de gerenciamento de **propostas** e **clientes**. O backend foi implementado utilizando **NestJS** e o frontend com **React** e **Tailwind CSS**.

## Visão Geral

### Backend (API)

- **Framework**: [NestJS](https://nestjs.com/)
- **Banco de Dados**: [TypeORM](https://typeorm.io/) (SQLite)
- **Funcionalidades**:
  - **Usuários**:
    - Buscar todos os usuários.
  - **Clientes (Customers)**:
    - Criar clientes.
    - Buscar todos os clientes.
  - **Propostas (Proposals)**:
    - Criar propostas.
    - Buscar propostas pendentes.
    - Aprovar propostas.
    - Buscar propostas recusadas.
    
### Frontend

- **Framework**: [React](https://reactjs.org/)
- **Ferramenta de Build**: [Vite](https://vitejs.dev/)
- **CSS**: [Tailwind CSS](https://tailwindcss.com/)
- **Funcionalidades**:
  - **Usuários**: Buscar todos os usuários.
  - **Clientes**: Criar e buscar todos os clientes.
  - **Propostas**: Criar, buscar pendentes, aprovar e buscar recusadas.

---

## Instruções de Instalação

### Pré-requisitos

- **Node.js** (>= 14.x)
- **NPM** ou **Yarn**

### Passos de Instalação

#### Clonando o Repositório

```bash
git https://github.com/joaoVictorS/homework.git
cd client
cd server
