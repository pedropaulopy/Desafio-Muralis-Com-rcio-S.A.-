package com.example.DesafioMuralis.model;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

// Entidade JPA que representa um contato (email, telefone, etc.) vinculado a um cliente
@Entity
public class Contato {
    // Identificador único do contato
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    // Relação Many-to-One com Cliente.
    // OnDelete CASCADE garante remoção dos contatos quando o cliente for excluído.
    @ManyToOne @JoinColumn(name="Cliente_Id", nullable=false) @OnDelete(action = OnDeleteAction.CASCADE)
    private Cliente cliente;

    // Tipo do contato (ENUM) armazenado como String no banco — obrigatório
    @NotNull(message="O tipo do contato não pode estar vazio") @Enumerated(EnumType.STRING) @Column(name="Tipo", length=50, nullable=false)
    private TipoContato tipo;

    // Valor do contato (email ou número) — obrigatório e limitado em tamanho
    @NotBlank(message="O valor do contato não pode estar vazio") @Column(name="Valor", length=100, nullable=false)
    private String valor;
    
    // Observação opcional para informações adicionais sobre o contato
    @Column(name="Observação")
    private String observacao;

    // Getters e Setters abaixo — comentários breves para cada acesso/mutação

    public Long getId() {
        // Retorna o id do contato
        return id;
    }

    public void setId(Long id) {
        // Define o id do contato (gerenciado pelo JPA)
        this.id = id;
    }

    public Cliente getCliente() {
        // Retorna o cliente associado a este contato
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        // Associa este contato a um cliente específico
        this.cliente = cliente;
    }

    public TipoContato getTipo() {
        // Retorna o tipo do contato (ENUM)
        return tipo;
    }

    public void setTipo(TipoContato tipo) {
        // Define o tipo do contato
        this.tipo = tipo;
    }

    public String getValor() {
        // Retorna o valor do contato (ex.: email ou telefone)
        return valor;
    }

    public void setValor(String valor) {
        // Define o valor do contato
        this.valor = valor;
    }

    public String getObservacao() {
        // Retorna a observação, se existir
        return observacao;
    }

    public void setObservacao(String observacao) {
        // Define ou atualiza a observação do contato
        this.observacao = observacao;
    }
}
