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
        <h2 style={{ margin: 0 }}>Contatos do Cliente #{clienteId}</h2>
        <button onClick={handleCriar}>Criar Contato</button>
    </div>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {contatos.length === 0 ? (
        <>
          <p>Nenhum contato encontrado para este cliente.</p>
        </>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Observação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {contatos.map((contato) => (
              <tr key={contato.id}>
                <td>{contato.id}</td>
                <td>{contato.tipo}</td>
                <td>{contato.valor}</td>
                <td>{contato.observacao || "-"}</td>
                <td>
                  <button onClick={() => handleEditar(contato.id)}>Editar</button>{" "}
                  <button onClick={() => handleDeletar(contato.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaContatosCliente;
