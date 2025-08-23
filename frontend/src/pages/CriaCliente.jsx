import React, { useState, useEffect } from "react";

function CriarCliente() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Busca o endereço automaticamente ao digitar 8 dígitos
  useEffect(() => {
    const buscarEndereco = async () => {
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();

          if (!data.erro) {
            const enderecoFormatado = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            setEndereco(enderecoFormatado);
          } else {
            setEndereco("");
            setMensagem("CEP não encontrado.");
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
          setMensagem("Erro ao buscar o endereço.");
        }
      } else {
        setEndereco(""); // Limpa caso apague o CEP
      }
    };

    buscarEndereco();
  }, [cep]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enderecoCompleto = `${endereco}, ${numero}${complemento ? `, ${complemento}` : ""}`;

    const cliente = {
      nome,
      cpf: cpf.replace(/\D/g, ""),
      data_nascimento,
      endereco: enderecoCompleto,
      cep
    };

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
        setCep("");
        setNumero("");
        setComplemento("");
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
            required
          />
        </div>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
            maxLength={8}
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
        <button type="submit">Criar Cliente</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default CriarCliente;
