import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

// Componente para atualizar um contato específico de um cliente
const AtualizaContato = ({ aoAtualizar }) => {
  // Recupera parâmetros da rota: id do cliente e do contato
  const { clienteId, contatoId } = useParams();

  // Estado local do contato (tipo, valor e observação) e mensagens
  const [contato, setContato] = useState({
    tipo: "",
    valor: "",
    observacao: ""
  });
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  // Efeito: carrega o contato ao montar o componente usando a API
  useEffect(() => {
    const buscarContato = async () => {
      try {
        // Busca todos os contatos do cliente e seleciona pelo contatoId
        const response = await axios.get(`http://localhost:8080/contatos/listar_contatos/${clienteId}`);
        const contatoSelecionado = response.data.find(c => c.id === Number(contatoId));
        if (contatoSelecionado) {
          // Preenche o estado com os dados do contato encontrado
          setContato(contatoSelecionado);
        } else {
          // Mensagem quando o contato não existe
          setMensagem("Contato não encontrado.");
        }
      } catch (error) {
        // Log para debug e mensagem resumida ao usuário
        console.error(error);
        setMensagem("Erro ao buscar contato.");
      }
    };

    buscarContato();
  }, [clienteId, contatoId]);

  // Atualiza campo do estado de contato conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContato(prev => ({ ...prev, [name]: value }));
  };

  // Envia atualização do contato ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Requisição PUT para atualizar o contato do cliente
      await axios.put(`http://localhost:8080/contatos/atualizar_contatos/${clienteId}/${contatoId}`, contato);
      // Feedback simples e notificação ao componente pai, se existir
      alert("Cliente atualizado com sucesso!");
      if (aoAtualizar) aoAtualizar();
    } catch (error) {
      // Log e mensagem de erro curta para o usuário
      console.error(error);
      setMensagem("Erro ao atualizar contato.");
    }
  };

  // Render do formulário com campos controlados e mensagens de status
  return (
    <div>
      <h2>Atualizar Contato</h2>
      {/* Mensagens resumidas de erro/estado */}
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo:</label>
          <select name="tipo" value={contato.tipo} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="EMAIL">Email</option>
            <option value="TELEFONE">Telefone</option>
            <option value="WHATSAPP">WhatsApp</option>
          </select>
        </div>

        <div>
          <label>Valor:</label>
          {/* Campo obrigatório para o valor do contato */}
          <input type="text" name="valor" value={contato.valor} onChange={handleChange} required />
        </div>

        <div>
          <label>Observação:</label>
          {/* Observação opcional; garante string vazia se undefined */}
          <input type="text" name="observacao" value={contato.observacao || ""} onChange={handleChange} />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default AtualizaContato;
