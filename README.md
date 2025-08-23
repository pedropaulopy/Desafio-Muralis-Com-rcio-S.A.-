# Sistema de Gerenciamento de Clientes e Contatos

Este projeto implementa um sistema completo de gerenciamento de **clientes** e seus **contatos**, dividido em duas camadas principais:

- **Frontend (React)** → Interface de usuário para cadastro, listagem, atualização e exclusão.  
- **Backend (Spring Boot)** → API REST responsável pelo processamento e persistência de dados em banco.

---

## ⚛️ Frontend (React)

### 👤 Clientes

- **Criar Cliente** (`CriaCliente.jsx`)  
  Formulário para cadastrar novo cliente com:
  - Nome
  - CPF
  - Data de nascimento
  - Endereço  
  ➕ Envia um `POST` para `/clientes/criar_cliente`

- **Listar Clientes** (`ListaClientes.jsx`)  
  Exibe todos os clientes cadastrados com botões para:
  - Editar cliente
  - Deletar cliente
  - Listar contatos do cliente  
  🔄 `GET /clientes`  
  ❌ `DELETE /clientes/deletar_cliente/{id}`  
  🔁 Redireciona para contatos

- **Atualizar Cliente** (`AtualizaCliente.jsx`)  
  Permite editar dados de um cliente existente.  
  🔍 `GET /clientes/{id}`  
  💾 `PUT /clientes/editar_cliente/{id}`

- **Deletar Cliente (Form)** (`DeletaCliente.jsx`)  
  Permite inserir manualmente o ID de um cliente para exclusão.  
  ❌ `DELETE /clientes/deletar_cliente/{id}`

---

### ☎️ Contatos

- **Listar Contatos do Cliente** (`ListaContatosCliente.jsx`)  
  Exibe todos os contatos de um cliente.  
  🔍 `GET /contatos/listar_contatos/{clienteId}`  
  ✏️ Editar ou deletar contato  
  ➕ Criar novo contato

- **Criar Contato** (`CriarContato.jsx`)  
  Formulário para cadastrar novo contato associado a um cliente:
  - Tipo (`EMAIL`, `TELEFONE`)
  - Valor
  - Observação (opcional)  
  ➕ `POST /contatos/criar_contato/{clienteId}`

- **Atualizar Contato** (`AtualizaContato.jsx`)  
  Permite editar os dados de um contato já existente.  
  🔍 `GET /contatos/listar_contatos/{clienteId}`  
  💾 `PUT /contatos/atualizar_contatos/{clienteId}/{contatoId}`

- **Deletar Contato (Confirmado)** (`DeletarContato.jsx`)  
  Exibe confirmação para deletar contato de um cliente específico  
  ❌ `DELETE /contatos/deletar_contato/{clienteId}/{contatoId}`

---

## ☕ Backend (Spring Boot)

### Estrutura

- **Controllers**
  - `ClienteController.java` → CRUD de clientes (criar, editar, deletar, listar e buscar):contentReference[oaicite:0]{index=0}  
  - `ContatoController.java` → CRUD de contatos vinculados a clientes:contentReference[oaicite:1]{index=1}

- **Models**
  - `Cliente.java` → Entidade cliente, com validações (`nome`, `cpf`, `data_nascimento`, `endereco`):contentReference[oaicite:2]{index=2}  
  - `Contato.java` → Entidade contato, associada a um cliente, com tipo, valor e observação:contentReference[oaicite:3]{index=3}  
  - `TipoContato.java` → Enum (`EMAIL`, `TELEFONE`):contentReference[oaicite:4]{index=4}

- **Repositories**
  - `ClienteRepository.java` → Consultas por nome, CPF ou ambos:contentReference[oaicite:5]{index=5}  
  - `ContatoRepository.java` → Busca contatos por cliente:contentReference[oaicite:6]{index=6}

- **Application**
  - `DesafioMuralisApplication.java` → Classe principal para inicialização do Spring Boot:contentReference[oaicite:7]{index=7}

---

## 🚀 Tecnologias Utilizadas

### Frontend
- React (hooks: `useState`, `useEffect`, `useNavigate`, `useParams`)
- React Router DOM
- Axios (requisições HTTP em contatos)
- Fetch API (requisições HTTP em clientes)

### Backend
- Java 17+  
- Spring Boot  
- Spring Data JPA  
- Hibernate Validator  
- Banco de dados relacional (configurável via Spring Boot)  
