import React, { useState } from "react";
import axios from "axios";

const DeletarContato = ({ clienteId, contatoId, aoDeletar }) => {
  const [mensagem, setMensagem] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/contatos/deletar_contato/${clienteId}/${contatoId}`,
        { data: {} } // necessário pois o método DELETE espera um corpo (mesmo vazio)
      );
      setMensagem("Contato deletado com sucesso!");
      if (aoDeletar) aoDeletar(); // callback para atualizar a lista após exclusão
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao deletar contato.");
    }
  };

  return (
    <div>
      <p>Tem certeza que deseja deletar o contato #{contatoId} do cliente #{clienteId}?</p>
      {mensagem && <p>{mensagem}</p>}
      <button onClick={handleDelete}>Confirmar Deleção</button>
    </div>
  );
};

export default DeletarContato;
