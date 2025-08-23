import React, { useState } from "react";

function DeletarCliente() {
  const [id, setId] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/clientes/deletar_cliente/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMensagem("Cliente deletado com sucesso!");
        setId("");
      } else if (response.status === 404) {
        setMensagem("Cliente não encontrado.");
      } else {
        setMensagem("Erro ao deletar cliente.");
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div>
      <h2>Deletar Cliente</h2>
      <form onSubmit={handleDelete}>
        <div>
          <label>ID do Cliente:</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Deletar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default DeletarCliente;
