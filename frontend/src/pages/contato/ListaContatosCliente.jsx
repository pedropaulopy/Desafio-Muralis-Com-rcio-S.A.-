import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Componente que lista e gerencia os contatos de um cliente específico
const ListaContatosCliente = () => {
  // Pega o ID do cliente da rota e prepara estados locais
  const { clienteId } = useParams();
  const [contatos, setContatos] = useState([]); // lista de contatos do cliente
  const [erro, setErro] = useState(""); // mensagem de erro amigável
  const navigate = useNavigate();

  // Ao montar (ou quando clienteId mudar), busca os contatos no backend
  useEffect(() => {
    if (!clienteId) return; // evita requisição sem id válido

    axios
      .get(`http://localhost:8080/contatos/listar_contatos/${clienteId}`)
      .then((response) => {
        // Atualiza o estado com os dados retornados
        setContatos(response.data);
      })
      .catch((error) => {
        // Log para debug e mensagem curta para o usuário
        console.error("Erro ao buscar contatos:", error);
        setErro("Não foi possível carregar os contatos do cliente.");
      });
  }, [clienteId]);

  // Navega para a tela de edição do contato selecionado
  const handleEditar = (contatoId) => {
    navigate(`/contatos/atualizar_contato/${clienteId}/${contatoId}`);
  };

  // Remove um contato após confirmação e atualiza a lista localmente
  const handleDeletar = (contatoId) => {
    if (!window.confirm("Tem certeza que deseja deletar este contato?")) return;

    axios
      .delete(`http://localhost:8080/contatos/deletar_contato/${clienteId}/${contatoId}`)
      .then(() => {
        // Feedback e remoção local para evitar nova busca completa
        alert("Contato deletado com sucesso!");
        setContatos(contatos.filter((contato) => contato.id !== contatoId));
      })
      .catch((error) => {
        // Erro tratado com log e alerta sucinto
        console.error("Erro ao deletar contato:", error);
        alert("Erro ao deletar contato.");
      });
  };

  // Redireciona para tela de criação de contato para este cliente
  const handleCriar = () => {
    navigate(`/contatos/criar_contato/${clienteId}`);
  };

  // Render: título, botão de criar, mensagem de erro e lista de contatos
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Contatos do Cliente #{clienteId}</h2>
        <button onClick={handleCriar}>Criar Contato</button>
      </div>

      {/* Exibe erro curto se houver problema ao carregar */}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {/* Mostra mensagem caso não existam contatos */}
      {contatos.length === 0 ? (
        <p>Nenhum contato encontrado para este cliente.</p>
      ) : (
        // Lista simples com ações de editar e deletar para cada contato
        <ul className="lista-clientes">
          {contatos.map((contato) => (
            <li key={contato.id} className="cliente-item">
              <div className="cliente-conteudo">
                <span>
                  <strong>{contato.tipo}</strong>: {contato.valor}
                  {/* Exibe observação apenas quando presente */}
                  {contato.observacao && <> — <em>{contato.observacao}</em></>}
                </span>
                <div className="cliente-botoes">
                  {/* Ações rápidas para cada contato */}
                  <button onClick={() => handleEditar(contato.id)}>EDITAR</button>
                  <button onClick={() => handleDeletar(contato.id)}>DELETAR</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaContatosCliente;
