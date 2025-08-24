import React, { useState } from "react";
import axios from "axios";

// Componente responsável por confirmar e executar a remoção de um contato
const DeletarContato = ({ clienteId, contatoId, aoDeletar }) => {
  // Estado para mensagens de status/erro exibidas ao usuário
  const [mensagem, setMensagem] = useState("");

  // Executa a requisição DELETE para remover o contato no backend
  const handleDelete = async () => {
    try {
      // axios.delete pode aceitar um corpo; aqui enviamos um vazio por compatibilidade
      await axios.delete(
        `http://localhost:8080/contatos/deletar_contato/${clienteId}/${contatoId}`,
        { data: {} } // necessário pois o método DELETE espera um corpo (mesmo vazio)
      );
      // Confirmação ao usuário e notificação para componente pai atualizar lista
      setMensagem("Contato deletado com sucesso!");
      if (aoDeletar) aoDeletar(); // callback para atualizar a lista após exclusão
    } catch (error) {
      // Log para debug e mensagem sucinta ao usuário
      console.error(error);
      setMensagem("Erro ao deletar contato.");
    }
  };

  // Render com confirmação simples e botão para disparar a deleção
  return (
    <div>
      <p>Tem certeza que deseja deletar o contato #{contatoId} do cliente #{clienteId}?</p>
      {/* Exibe mensagem de status ou erro quando definida */}
      {mensagem && <p>{mensagem}</p>}
      <button onClick={handleDelete}>Confirmar Deleção</button>
    </div>
  );
};

export default DeletarContato;
