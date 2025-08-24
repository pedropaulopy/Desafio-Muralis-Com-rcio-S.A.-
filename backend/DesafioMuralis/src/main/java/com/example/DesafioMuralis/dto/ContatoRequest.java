package com.example.DesafioMuralis.dto;

// DTO usado para receber dados de criação/atualização de contato via API.
// Contém apenas os campos necessários para a operação, sem regras de negócio.
public class ContatoRequest {
    // ID do cliente ao qual o contato será associado (obrigatório em endpoints que precisam do vínculo)
    private Long clienteId;
    // Tipo do contato (ex.: EMAIL, TELEFONE, WHATSAPP)
    private String tipo;
    // Valor do contato (email ou número de telefone)
    private String valor;
    // Observação opcional sobre o contato
    private String observacao;

    // Getters e Setters
    public Long getClienteId() {
        // Retorna o clienteId associado a este pedido
        return clienteId;
    }

    public void setClienteId(Long clienteId) {
        // Define o clienteId (usado pelo controller para vincular o contato)
        this.clienteId = clienteId;
    }

    public String getTipo() {
        // Retorna o tipo do contato
        return tipo;
    }

    public void setTipo(String tipo) {
        // Define o tipo do contato
        this.tipo = tipo;
    }

    public String getValor() {
        // Retorna o valor do contato (email/telefone)
        return valor;
    }

    public void setValor(String valor) {
        // Define o valor do contato
        this.valor = valor;
    }

    public String getObservacao() {
        // Retorna a observação (pode ser null)
        return observacao;
    }

    public void setObservacao(String observacao) {
        // Define a observação do contato
        this.observacao = observacao;
    }
}
