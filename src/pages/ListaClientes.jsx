import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:8080/clientes");
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleEditar = (id) => {
    navigate(`/editar_cliente/${id}`);
  };

  const handleDeletar = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este cliente?")) return;

    try {
      const response = await fetch(`http://localhost:8080/clientes/deletar_cliente/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Cliente deletado com sucesso!");
        fetchClientes();
      } else {
        alert("Erro ao deletar cliente.");
      }
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  const handleListarContatos = (clienteId) => {
    navigate(`/contatos/listar_contatos/${clienteId}`);
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      {clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.id}>
              <strong>{cliente.nome}</strong> — CPF: {cliente.cpf} —{" "}
              <button onClick={() => handleEditar(cliente.id)}>Editar</button>
              <button onClick={() => handleDeletar(cliente.id)}>Deletar</button>
              <button onClick={() => handleListarContatos(cliente.id)}>Listar Contatos</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaClientes;
