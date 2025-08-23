import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ListaContatosCliente = () => {
  const { clienteId } = useParams();
  const [contatos, setContatos] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!clienteId) return;

    axios
      .get(`http://localhost:8080/contatos/listar_contatos/${clienteId}`)
      .then((response) => {
        setContatos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar contatos:", error);
        setErro("Não foi possível carregar os contatos do cliente.");
      });
  }, [clienteId]);

  const handleEditar = (contatoId) => {
    navigate(`/contatos/atualizar_contato/${clienteId}/${contatoId}`);
  };

  const handleDeletar = (contatoId) => {
    if (!window.confirm("Tem certeza que deseja deletar este contato?")) return;

    axios
      .delete(`http://localhost:8080/contatos/deletar_contato/${clienteId}/${contatoId}`)
      .then(() => {
        alert("Contato deletado com sucesso!");
        setContatos(contatos.filter((contato) => contato.id !== contatoId));
      })
      .catch((error) => {
        console.error("Erro ao deletar contato:", error);
        alert("Erro ao deletar contato.");
      });
  };

  const handleCriar = () => {
    navigate(`/contatos/criar_contato/${clienteId}`);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Contatos do Cliente #{clienteId}</h2>
        <button onClick={handleCriar}>Criar Contato</button>
      </div>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {contatos.length === 0 ? (
        <p>Nenhum contato encontrado para este cliente.</p>
      ) : (
        <ul className="lista-clientes">
          {contatos.map((contato) => (
            <li key={contato.id} className="cliente-item">
              <div className="cliente-conteudo">
                <span>
                  <strong>{contato.tipo}</strong>: {contato.valor}
                  {contato.observacao && <> — <em>{contato.observacao}</em></>}
                </span>
                <div className="cliente-botoes">
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
