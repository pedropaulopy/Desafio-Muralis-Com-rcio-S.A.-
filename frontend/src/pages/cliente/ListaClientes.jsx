import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Componente que lista clientes e oferece ações (editar, deletar, listar contatos)
function ListaClientes() {
  // Estados: lista de clientes e navegação
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  // Formata CPF numérico em máscara padrão: 000.000.000-00
  const formatarCPF = (cpf) => {
    if (!cpf || cpf.length !== 11) return cpf;
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  // Busca todos os clientes no backend e atualiza o estado
  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:8080/clientes");
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      // Erro ao buscar clientes (log para desenvolvimento)
      console.error("Erro ao buscar clientes:", error);
    }
  };

  // Carrega a lista uma vez ao montar o componente
  useEffect(() => {
    fetchClientes();
  }, []);

  // Navega para a página de edição de cliente com o id informado
  const handleEditar = (id) => {
    navigate(`/editar_cliente/${id}`);
  };

  // Deleta cliente após confirmação e atualiza a lista
  const handleDeletar = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este cliente?")) return;

    try {
      const response = await fetch(`http://localhost:8080/clientes/deletar_cliente/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Cliente deletado com sucesso!");
        fetchClientes(); // Recarrega lista após exclusão
      } else {
        alert("Erro ao deletar cliente.");
      }
    } catch (error) {
      // Erro de rede ou servidor
      console.error("Erro ao deletar cliente:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  // Navega para a lista de contatos do cliente selecionado
  const handleListarContatos = (clienteId) => {
    navigate(`/contatos/listar_contatos/${clienteId}`);
  };

  // Render: exibe mensagem caso não haja clientes ou uma lista com ações
  return (
    <div>
      <h2>Lista de Clientes</h2>
      {clientes.length === 0 ? (
        // Mensagem quando não há clientes cadastrados
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        // Lista de clientes com botões de ação
        <ul className="lista-clientes">
          {clientes.map((cliente) => (
            <li key={cliente.id} className="cliente-item">
              <div className="cliente-conteudo">
                <span>
                  <strong>{cliente.nome}</strong> — CPF: {formatarCPF(cliente.cpf)}
                </span>
                <div className="cliente-botoes">
                  {/* Botões: editar, deletar e listar contatos do cliente */}
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
