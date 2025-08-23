import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CriarContato = ({ aoCriar }) => {
  const { clienteId } = useParams();
  const [tipo, setTipo] = useState("");
  const [valor, setValor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const tiposContato = ["EMAIL", "TELEFONE", "CELULAR", "WHATSAPP"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clienteId) {
      setMensagem("ID do cliente é obrigatório.");
      return;
    }

    try {
      const novoContato = { tipo, valor, observacao };
      await axios.post(
        `http://localhost:8080/contatos/criar_contato/${clienteId}`,
        novoContato
      );

      setMensagem("Contato criado com sucesso!");
      setTipo("");
      setValor("");
      setObservacao("");
      if (aoCriar) aoCriar();
    } catch (err) {
      setMensagem("Erro ao criar contato. Verifique os dados.");
      console.error(err);
    }
  };

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
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Observação:</label>
          <input
            type="text"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
        </div>

        <button type="submit">Criar Contato</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CriarContato;
