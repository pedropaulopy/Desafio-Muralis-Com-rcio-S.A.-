import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const AtualizaContato = ({ aoAtualizar }) => {
  const { clienteId, contatoId } = useParams();
  const [contato, setContato] = useState({
    tipo: "",
    valor: "",
    observacao: ""
  });
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const buscarContato = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/contatos/listar_contatos/${clienteId}`);
        const contatoSelecionado = response.data.find(c => c.id === Number(contatoId));
        if (contatoSelecionado) {
          setContato(contatoSelecionado);
        } else {
          setMensagem("Contato não encontrado.");
        }
      } catch (error) {
        console.error(error);
        setMensagem("Erro ao buscar contato.");
      }
    };

    buscarContato();
  }, [clienteId, contatoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContato(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/contatos/atualizar_contatos/${clienteId}/${contatoId}`, contato);
      alert("Cliente atualizado com sucesso!");
      if (aoAtualizar) aoAtualizar();
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao atualizar contato.");
    }
  };

  return (
    <div>
      <h2>Atualizar Contato</h2>
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
          <input type="text" name="valor" value={contato.valor} onChange={handleChange} required />
        </div>

        <div>
          <label>Observação:</label>
          <input type="text" name="observacao" value={contato.observacao || ""} onChange={handleChange} />
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default AtualizaContato;
