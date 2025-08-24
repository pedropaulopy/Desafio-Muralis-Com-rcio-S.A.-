import React, { useState, useEffect } from "react";

// Componente para criar um novo cliente através de um formulário controlado
function CriarCliente() {
  // Estados controlados para os campos do formulário e mensagens de status
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Efeito: busca endereço automaticamente quando o CEP tem 8 dígitos
  useEffect(() => {
    const buscarEndereco = async () => {
      // Apenas consulta se o CEP estiver completo
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();

          if (!data.erro) {
            // Formata o endereço retornado e atualiza o estado
            const enderecoFormatado = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            setEndereco(enderecoFormatado);
          } else {
            // CEP inválido ou não encontrado
            setEndereco("");
            setMensagem("CEP não encontrado.");
          }
        } catch (error) {
          // Erro na requisição ao serviço de CEP
          console.error("Erro ao buscar CEP:", error);
          setMensagem("Erro ao buscar o endereço.");
        }
      } else {
        // Limpa o campo de endereço enquanto o CEP estiver incompleto
        setEndereco("");
      }
    };

    buscarEndereco();
  }, [cep]);

  // Handler do envio: monta o objeto do cliente e envia para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Monta endereço com número e complemento se houver
    const enderecoCompleto = `${endereco}, ${numero}${complemento ? `, ${complemento}` : ""}`;

    const cliente = {
      nome,
      cpf: cpf.replace(/\D/g, ""), // Remove formatação para enviar apenas números
      data_nascimento,
      endereco: enderecoCompleto,
      cep
    };
    console.log("Cliente a ser enviado:", cliente);
    try {
      const response = await fetch("http://localhost:8080/clientes/criar_cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });

      if (response.ok) {
        // Limpa formulários e informa sucesso
        setMensagem("Cliente criado com sucesso!");
        setNome("");
        setCpf("");
        setDataNascimento("");
        setEndereco("");
        setCep("");
        setNumero("");
        setComplemento("");
      } else {
        // Backend retornou erro
        setMensagem("Erro ao criar cliente.");
      }
    } catch (error) {
      // Erro de conexão com o servidor
      console.error("Erro:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  // Render do formulário com campos controlados e validações simples
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
              // Formatação visual do CPF enquanto digita: xxx.xxx.xxx-xx
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
            // Endereço é preenchido automaticamente a partir do CEP
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
      {/* Exibe mensagens de status ou erro para o usuário */}
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default CriarCliente;
