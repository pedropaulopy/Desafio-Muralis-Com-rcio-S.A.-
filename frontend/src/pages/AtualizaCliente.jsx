import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AtualizaCliente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const buscarEndereco = async () => {
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();

          if (!data.erro) {
            const enderecoFormatado = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            setEndereco(enderecoFormatado);
            setMensagem("");
          } else {
            setEndereco("");
            setMensagem("CEP não encontrado.");
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
          setMensagem("Erro ao buscar o endereço.");
        }
      } else {
        setEndereco(""); // Limpa o endereço caso o cep esteja incompleto
      }
    };

    buscarEndereco();
  }, [cep]);

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

          // Tenta extrair CEP, número e complemento do endereço (se vier no padrão)
          const partes = (data.endereco || "").split(",");
          if (partes.length >= 3) {
            setNumero(partes[3]?.trim() || "");
            setComplemento(partes[4]?.trim() || "");
          }

          // Você pode adaptar a lógica para extrair o CEP se ele estiver no começo ou final do endereço
          if (data.endereco?.includes("CEP:")) {
            const cepExtraido = data.endereco.match(/CEP: ?(\d{8})/);
            if (cepExtraido) setCep(cepExtraido[1]);
          }
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

    const enderecoCompleto = `${endereco}, ${numero}${complemento ? `, ${complemento}` : ""}, CEP: ${cep}`;

    const clienteAtualizado = {
      nome,
      cpf: cpf.replace(/\D/g, ""),
      data_nascimento,
      endereco: enderecoCompleto,
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
          <label>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, "").slice(0, 8))}
            placeholder="Somente números"
            required
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            value={endereco}
            disabled
          />
        </div>
        <div>
          <label>Número:</label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Complemento:</label>
          <input
            type="text"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default AtualizaCliente;
