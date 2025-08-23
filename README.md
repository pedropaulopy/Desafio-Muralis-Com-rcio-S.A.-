# Sistema de Gerenciamento de Clientes e Contatos

Este projeto em React implementa uma interface para cadastro, listagem, atualização e exclusão de **clientes** e seus **contatos**. A aplicação interage com uma API REST hospedada localmente (`http://localhost:8080`).

---

## 📁 Funcionalidades

### 👤 Clientes

- **Criar Cliente** (`CriaCliente.jsx`)  
  Formulário para cadastrar novo cliente com:
  - Nome
  - CPF
  - Data de nascimento
  - Endereço  
  ➕ Envia um `POST` para `/clientes/criar_cliente` :contentReference[oaicite:0]{index=0}

- **Listar Clientes** (`ListaClientes.jsx`)  
  Exibe todos os clientes cadastrados com botões para:
  - Editar cliente
  - Deletar cliente
  - Listar contatos do cliente  
  🔄 Consulta `GET /clientes`  
  ❌ Envia `DELETE` para `/clientes/deletar_cliente/{id}`  
  🔁 Redireciona para contatos via `navigate`:contentReference[oaicite:1]{index=1}

- **Atualizar Cliente** (`AtualizaCliente.jsx`)  
  Permite editar dados de um cliente existente.  
  🔍 Carrega os dados via `GET /clientes/{id}`  
  💾 Salva via `PUT /clientes/editar_cliente/{id}`:contentReference[oaicite:2]{index=2}

- **Deletar Cliente (Form)** (`DeletaCliente.jsx`)  
  Permite inserir manualmente o ID de um cliente para exclusão.  
  ❌ Envia `DELETE` para `/clientes/deletar_cliente/{id}`:contentReference[oaicite:3]{index=3}

---

### ☎️ Contatos

- **Listar Contatos do Cliente** (`ListaContatosCliente.jsx`)  
  Exibe todos os contatos de um cliente.  
  🔍 Carrega via `GET /contatos/listar_contatos/{clienteId}`  
  ✏️ Permite editar ou deletar cada contato individualmente  
  ➕ Botão para criar novo contato:contentReference[oaicite:4]{index=4}

- **Criar Contato** (`CriarContato.jsx`)  
  Formulário para cadastrar novo contato associado a um cliente:
  - Tipo (`EMAIL`, `TELEFONE`)
  - Valor
  - Observação (opcional)  
  ➕ Envia `POST` para `/contatos/criar_contato/{clienteId}`:contentReference[oaicite:5]{index=5}

- **Atualizar Contato** (`AtualizaContato.jsx`)  
  Permite editar os dados de um contato já existente:  
  🔍 Busca os contatos com `GET /contatos/listar_contatos/{clienteId}`  
  💾 Atualiza via `PUT /contatos/atualizar_contatos/{clienteId}/{contatoId}`:contentReference[oaicite:6]{index=6}

- **Deletar Contato (Confirmado)** (`DeletarContato.jsx`)  
  Exibe confirmação para deletar contato de um cliente específico  
  ❌ Envia `DELETE /contatos/deletar_contato/{clienteId}/{contatoId}`:contentReference[oaicite:7]{index=7}

---

## 🚀 Tecnologias Utilizadas

- React (hooks, useState, useEffect, useNavigate, useParams)
- React Router DOM
- Axios para requisições HTTP (em contatos)
- Fetch API (em clientes)
- Backend esperado: API REST com endpoints `http://localhost:8080`

---

## 🗂️ Organização dos Arquivos

