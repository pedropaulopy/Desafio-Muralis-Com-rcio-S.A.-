import React, { useState } from "react";

function CriarCliente() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cliente = { nome, cpf, data_nascimento, endereco };

    try {
      const response = await fetch("http://localhost:8080/clientes/criar_cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        setMensagem("Cliente criado com sucesso!");
        setNome("");
        setCpf("");
        setDataNascimento("");
        setEndereco("");
      } else {
        setMensagem("Erro ao criar cliente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="form-container">
      <h2>Novo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome* :</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CPF* (com pontos):</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Data de Nascimento (YYYY-MM-DD):</label>
          <input
            type="date"
            value={data_nascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Cliente</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default CriarCliente;
