import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Componente para criar um novo contato associado a um cliente
const CriarContato = ({ aoCriar }) => {
  // Recupera o ID do cliente a partir da rota
  const { clienteId } = useParams();

  // Estados controlados para os campos do formulário e mensagens
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [mensagem, setMensagem] = useState("");

  // Lista simples de tipos permitidos (pode ser estendida)
  const tiposContato = ["EMAIL", "TELEFONE"];

  // Envia o novo contato ao backend; valida presença do clienteId
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clienteId) {
      // Mensagem curta quando falta o ID do cliente
      setMensagem("ID do cliente é obrigatório.");
      return;
    }

    try {
      // Monta o objeto do contato e envia via POST
      const novoContato = { tipo, valor, observacao };
      await axios.post(
        `http://localhost:8080/contatos/criar_contato/${clienteId}`,
        novoContato
      );

      // Feedback e limpeza dos campos após sucesso
      setMensagem("Contato criado com sucesso!");
      setTipo("");
      setValor("");
      setObservacao("");
      if (aoCriar) aoCriar(); // Notifica componente pai, se fornecido
    } catch (err) {
      // Mensagem sucinta em caso de falha
      setMensagem("Erro ao criar contato. Verifique os dados.");
      console.error(err);
    }
  };

  // Render do formulário com campos controlados e validações básicas
  return (
    <div className="form-container">
      <h2>Criar Contato para Cliente #{clienteId}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo:</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            {tiposContato.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Valor:</label>
          <input
            // Campo obrigatório para o valor do contato (email ou telefone)
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Observação:</label>
          <input
            // Campo opcional para anotações rápidas sobre o contato
            type="text"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
        </div>

        <button type="submit">Criar Contato</button>
      </form>
      {/* Mensagem de status ou erro, exibida quando definida */}
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CriarContato;
