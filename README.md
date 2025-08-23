# Sistema de Gerenciamento de Clientes e Contatos

Este projeto implementa um sistema completo de gerenciamento de **clientes** e seus **contatos**, dividido em duas camadas principais:

- **Frontend (React)** → Interface de usuário para cadastro, listagem, atualização e exclusão.  
- **Backend (Spring Boot)** → API REST responsável pelo processamento e persistência de dados em banco.

---

## 🚀 Como Executar Localmente

### ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18+ recomendada)
- [Java 17+](https://adoptium.net/)
- [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)
- Git (opcional)

---

### 📦 1. Clone o Projeto

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

> Ou baixe o `.zip`, extraia e navegue até a pasta.

---

### 🐳 2. Suba o banco de dados PostgreSQL com Docker

```bash
docker-compose up -d
```

Isso criará um container com:

- Banco: `contatosdb`
- Usuário: `appuser`
- Senha: `apppass`
- Porta: `5432`

---

### ☕ 3. Inicie o Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

> Se estiver em Windows: `mvnw.cmd spring-boot:run`

---

### ⚛️ 4. Inicie o Frontend (React)

```bash
cd ../frontend
npm install
npm start
```

---

### 🔍 Teste nos Navegadores

- **Frontend**: http://localhost:3000  
- **API Swagger (Documentação)**: http://localhost:8080/docs-swagger  

---

## ⚛️ Frontend (React)

### 👤 Clientes

- **Criar Cliente** (`CriaCliente.jsx`)  
  ➕ Envia um `POST` para `/clientes/criar_cliente`

- **Listar Clientes** (`ListaClientes.jsx`)  
  🔄 `GET /clientes`  
  ❌ `DELETE /clientes/deletar_cliente/{id}`  
  🔁 Redireciona para contatos

- **Atualizar Cliente** (`AtualizaCliente.jsx`)  
  🔍 `GET /clientes/{id}`  
  💾 `PUT /clientes/editar_cliente/{id}`

- **Deletar Cliente (Form)** (`DeletaCliente.jsx`)  
  ❌ `DELETE /clientes/deletar_cliente/{id}`

---

### ☎️ Contatos

- **Listar Contatos do Cliente** (`ListaContatosCliente.jsx`)  
  🔍 `GET /contatos/listar_contatos/{clienteId}`  
  ✏️ Editar ou deletar contato  
  ➕ Criar novo contato

- **Criar Contato** (`CriarContato.jsx`)  
  ➕ `POST /contatos/criar_contato/{clienteId}`

- **Atualizar Contato** (`AtualizaContato.jsx`)  
  💾 `PUT /contatos/atualizar_contatos/{clienteId}/{contatoId}`

- **Deletar Contato (Confirmado)** (`DeletarContato.jsx`)  
  ❌ `DELETE /contatos/deletar_contato/{clienteId}/{contatoId}`

---

## ☕ Backend (Spring Boot)

### Estrutura

- **Controllers**
  - `ClienteController.java`
  - `ContatoController.java`

- **Models**
  - `Cliente.java`
  - `Contato.java`
  - `TipoContato.java`

- **Repositories**
  - `ClienteRepository.java`
  - `ContatoRepository.java`

- **Application**
  - `DesafioMuralisApplication.java`

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React (hooks: `useState`, `useEffect`, `useNavigate`, `useParams`)
- React Router DOM
- Axios
- Fetch API

### Backend
- Java 17+
- Spring Boot
- Spring Data JPA
- Hibernate Validator
- PostgreSQL (via Docker)

---

## 📂 docker-compose.yml

Já incluído na raiz do projeto:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
    container_name: contatosdb
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: contatosdb
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: apppass
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

---

## 👨‍💻 Autor

Projeto desenvolvido como parte do **Desafio Muralis** 🚀
