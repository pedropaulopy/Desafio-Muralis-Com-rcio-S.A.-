import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AtualizaCliente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function fetchCliente() {
      try {
        const response = await fetch(`http://localhost:8080/clientes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setNome(data.nome || "");
          setCpf(data.cpf || "");
          setDataNascimento(data.data_nascimento || "");
          setEndereco(data.endereco || "");
        } else {
          setMensagem("Erro ao carregar cliente.");
        }
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        setMensagem("Erro de conexão com o servidor.");
      }
    }

    fetchCliente();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clienteAtualizado = {
      nome,
      cpf,
      data_nascimento,
      endereco,
    };

    try {
      const response = await fetch(`http://localhost:8080/clientes/editar_cliente/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clienteAtualizado),
      });

      if (response.ok) {
        alert("Cliente atualizado com sucesso!");
        navigate("/clientes");
      } else {
        setMensagem("Erro ao atualizar cliente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="form-container">
      <h2>Atualizar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => {
              let v = e.target.value.replace(/\D/g, "");
              v = v.replace(/(\d{3})(\d)/, "$1.$2");
              v = v.replace(/(\d{3})(\d)/, "$1.$2");
              v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
              setCpf(v);
            }}
            maxLength={14}
            required
          />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            value={data_nascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default AtualizaCliente;
