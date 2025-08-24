package com.example.DesafioMuralis.model;

import java.time.LocalDate;

import org.hibernate.validator.constraints.br.CPF;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;

// Entidade JPA que representa um cliente no sistema.
// Contém validações básicas e formato de serialização para datas.
@Entity
public class Cliente {
    // Identificador gerado automaticamente
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Nome do cliente: obrigatório, tamanho limitado
    @NotBlank(message = "O nome do cliente não pode estar vazio.")
    @Column(name = "Nome", length = 100, nullable = false)
    private String nome;

    // CPF formatado/validado; campo único no banco
    @NotBlank(message = "O CPF não pode estar vazio.")
    @CPF(message = "CPF inválido.")
    @Column(name = "CPF", length = 14, nullable = false, unique = true)
    private String cpf;

    // Data de nascimento: deve ser no passado; serializa como yyyy-MM-dd
    @Past(message = "A data de nascimento deve estar no passado.")
    @Column(name = "Data de Nascimento", length = 14, nullable = true, unique = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate data_nascimento;

    // Endereço completo como texto livre (opcional)
    @Column(name = "Endereço", nullable = true)
    private String endereco;

    // CEP apenas com números (opcional)
    @Column(name = "CEP", length = 8, nullable = true)
    private String cep;

    // Getters e Setters (acesso e mutação dos campos)
    public Long getId() {
        // Retorna o id do cliente
        return id;
    }

    public void setId(Long id) {
        // Define o id do cliente (geralmente usado pelo JPA)
        this.id = id;
    }

    public String getNome() {
        // Retorna o nome armazenado
        return nome;
    }

    public void setNome(String nome) {
        // Define o nome do cliente
        this.nome = nome;
    }

    public String getCpf() {
        // Retorna o CPF (pode estar formatado)
        return cpf;
    }

    public void setCpf(String cpf) {
        // Define o CPF do cliente
        this.cpf = cpf;
    }

    public LocalDate getData_nascimento() {
        // Retorna a data de nascimento (LocalDate) ou null
        return data_nascimento;
    }

    public void setData_nascimento(LocalDate data_nascimento) {
        // Define a data de nascimento do cliente
        this.data_nascimento = data_nascimento;
    }

    public String getEndereco() {
        // Retorna o endereço completo
        return endereco;
    }

    public void setEndereco(String endereco) {
        // Define o endereço do cliente
        this.endereco = endereco;
    }

    public String getCep() {
        // Retorna o CEP associado ao endereço
        return cep;
    }

    public void setCep(String cep) {
        // Define o CEP (recomenda-se salvar apenas números)
        this.cep = cep;
    }
}
