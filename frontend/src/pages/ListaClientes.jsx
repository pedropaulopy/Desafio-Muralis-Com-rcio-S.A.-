import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  const formatarCPF = (cpf) => {
    if (!cpf || cpf.length !== 11) return cpf;
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

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
        <ul className="lista-clientes">
          {clientes.map((cliente) => (
            <li key={cliente.id} className="cliente-item">
              <div className="cliente-conteudo">
                <span>
                  <strong>{cliente.nome}</strong> — CPF: {formatarCPF(cliente.cpf)}
                </span>
                <div className="cliente-botoes">
                  <button onClick={() => handleEditar(cliente.id)}>EDITAR</button>
                  <button onClick={() => handleDeletar(cliente.id)}>DELETAR</button>
                  <button onClick={() => handleListarContatos(cliente.id)}>LISTAR CONTATOS</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaClientes;
