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

@Entity
public class Contato {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @ManyToOne @JoinColumn(name="Cliente_Id", nullable=false) @OnDelete(action = OnDeleteAction.CASCADE)
    private Cliente cliente;

    @NotNull(message="O tipo do contato não pode estar vazio") @Enumerated(EnumType.STRING) @Column(name="Tipo", length=50, nullable=false)
    private TipoContato tipo;

    @NotBlank(message="O valor do contato não pode estar vazio") @Column(name="Valor", length=100, nullable=false)
    private String valor;
    
    @Column(name="Observação")
    private String observacao;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public TipoContato getTipo() {
        return tipo;
    }

    public void setTipo(TipoContato tipo) {
        this.tipo = tipo;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }
}
