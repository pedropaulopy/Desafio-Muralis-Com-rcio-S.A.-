package com.example.DesafioMuralis.model;
import java.time.LocalDate;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;

@Entity
public class Cliente {
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    
    @NotBlank(message="O nome do cliente não pode estar vazio.") @Column(name="Nome", length=100, nullable=false)
    private String nome;

    @NotBlank(message="O CPF não pode estar vazio.")@CPF(message="CPF inválido.") @Column(name="CPF", length=14, nullable=false, unique=true)
    private String cpf;

    @Past(message="A data de nascimento deve estar no passado.") @Column(name="Data de Nascimento", length=14, nullable=true, unique=false)
    private LocalDate data_nascimento;

    @Column(name="Endereço", nullable=true)
    private String endereco;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getData_nascimento() {
        return data_nascimento;
    }

    public void setData_nascimento(LocalDate data_nascimento) {
        this.data_nascimento = data_nascimento;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
    
}
