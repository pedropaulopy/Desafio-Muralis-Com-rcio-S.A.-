import React, { useState } from "react";

// Componente simples para deletar um cliente pelo ID
function DeletarCliente() {
  // Estado para o ID informado pelo usuário e mensagens de status/erro
  const [id, setId] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Handler que envia a requisição DELETE para o backend
  const handleDelete = async (e) => {
    e.preventDefault(); // Evita recarregar a página

    try {
      // Faz a requisição de deleção usando o ID fornecido
      const response = await fetch(`http://localhost:8080/clientes/deletar_cliente/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Sucesso: limpa o campo e mostra confirmação
        setMensagem("Cliente deletado com sucesso!");
        setId("");
      } else if (response.status === 404) {
        // ID não encontrado no servidor
        setMensagem("Cliente não encontrado.");
      } else {
        // Outros erros retornados pelo backend
        setMensagem("Erro ao deletar cliente.");
      }
    } catch (error) {
      // Erro de rede ou servidor inacessível
      console.error("Erro ao deletar:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  // Render do formulário de deleção com validação básica
  return (
    <div>
      <h2>Deletar Cliente</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>ID do Cliente:</label>
          <input
            // Campo numérico para informar o ID do cliente a ser deletado
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Deletar</button>
      </form>
      {/* Mostra mensagem de status ou erro quando existir */}
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default DeletarCliente;
