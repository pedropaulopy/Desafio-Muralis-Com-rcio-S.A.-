import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ListaClientes from "./pages/ListaClientes";
import CriarCliente from "./pages/CriaCliente";
import AtualizaCliente from "./pages/AtualizaCliente";
import DeletaCliente from "./pages/DeletaCliente";
import ListaContatosCliente from "./pages/contato/ListaContatosCliente";
import CriarContato from "./pages/contato/CriarContato";
import DeletarContato from "./pages/DeletaCliente";
import AtualizaContato from "./pages/contato/AtualizaContato";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Desafio Muralis - Comércio S.A.</h1>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/clientes">Listar Clientes</Link> |{" "}
          <Link to="/criar-cliente">Criar Cliente</Link> |{" "}
        </nav>

        <Routes>
          <Route path="/" element={<h2>Bem-vindo ao sistema!</h2>} />
          <Route path="/clientes" element={<ListaClientes />} />
          <Route path="/criar-cliente" element={<CriarCliente />} />
          <Route path="editar_cliente/:id" element={<AtualizaCliente />} />
          <Route path="deletar_cliente/:id" element={<DeletaCliente />} />
          <Route path="/contatos/listar_contatos/:clienteId" element={<ListaContatosCliente />} />
          <Route path="/contatos/criar_contato/:clienteId" element={<CriarContato />} />
          <Route path="/contatos/atualizar_contato/:clienteId/:contatoId" element={<AtualizaContato />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
