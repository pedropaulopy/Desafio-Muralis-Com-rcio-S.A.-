import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Componente de UI: formulário para atualizar os dados de um cliente existente
function AtualizaCliente() {
  // Pega o id da rota e uma função para navegação
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados locais para os campos do formulário e mensagens
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [data_nascimento, setDataNascimento] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Efeito para buscar endereço automaticamente ao preencher CEP (quando tiver 8 dígitos)
  useEffect(() => {
    const buscarEndereco = async () => {
      // Se CEP completo, solicita dados ao serviço viacep
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();

          if (!data.erro) {
            // Formata e salva o endereço retornado
            const enderecoFormatado = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
            setEndereco(enderecoFormatado);
            setMensagem("");
          } else {
            // CEP não encontrado
            setEndereco("");
            setMensagem("CEP não encontrado.");
          }
        } catch (error) {
          // Erro na requisição ao serviço de CEP
          console.error("Erro ao buscar CEP:", error);
          setMensagem("Erro ao buscar o endereço.");
        }
      } else {
        // Limpa o endereço enquanto o CEP estiver incompleto
        setEndereco("");
      }
    };

    buscarEndereco();
  }, [cep]);

  // Efeito para buscar dados do cliente ao montar o componente (usa o id da rota)
  useEffect(() => {
    async function fetchCliente() {
      try {
        const response = await fetch(`http://localhost:8080/clientes/${id}`);
        if (response.ok) {
          const data = await response.json();
          // Preenche campos com dados retornados, usando fallback para strings vazias
          setNome(data.nome || "");
          setCpf(data.cpf || "");
          setDataNascimento(data.data_nascimento || "");
          setEndereco(data.endereco || "");

          // Tenta extrair número e complemento a partir do campo 'endereco' (se padrão conhecido)
          const partes = (data.endereco || "").split(",");
          if (partes.length >= 3) {
            setNumero(partes[3]?.trim() || "");
            setComplemento(partes[4]?.trim() || "");
          }

          // Tenta extrair CEP se estiver no formato "CEP: 00000000"
          if (data.endereco?.includes("CEP:")) {
            const cepExtraido = data.endereco.match(/CEP: ?(\d{8})/);
            if (cepExtraido) setCep(cepExtraido[1]);
          }
        } else {
          // Resposta não ok do backend
          setMensagem("Erro ao carregar cliente.");
        }
      } catch (error) {
        // Erro de conexão com servidor
        console.error("Erro ao buscar cliente:", error);
        setMensagem("Erro de conexão com o servidor.");
      }
    }

    fetchCliente();
  }, [id]);

  // Handler de envio do formulário que monta o objeto e faz PUT no backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Monta o endereço completo com número, complemento e CEP
    const enderecoCompleto = `${endereco}, ${numero}${complemento ? `, ${complemento}` : ""}, CEP: ${cep}`;

    const clienteAtualizado = {
      nome,
      cpf: cpf.replace(/\D/g, ""), // Remove formatação para enviar somente números
      data_nascimento,
      endereco: enderecoCompleto,
      cep,
    };

    try {
      const response = await fetch(`http://localhost:8080/clientes/editar_cliente/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clienteAtualizado),
      });

      if (response.ok) {
        // Sucesso: informa usuário e redireciona para lista
        alert("Cliente atualizado com sucesso!");
        navigate("/clientes");
      } else {
        // Erro retornado pelo backend
        setMensagem("Erro ao atualizar cliente.");
      }
    } catch (error) {
      // Erro de conexão ao atualizar
      console.error("Erro ao atualizar cliente:", error);
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  // Render do formulário com campos controlados
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
              // Formata CPF enquanto o usuário digita (xxx.xxx.xxx-xx)
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
      {/* Exibe mensagens de erro ou status para o usuário */}
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

/* Comentário final explicando exportação do componente */
export default AtualizaCliente;
