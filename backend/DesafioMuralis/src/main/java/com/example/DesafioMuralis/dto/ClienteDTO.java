package com.example.DesafioMuralis.dto;

import com.example.DesafioMuralis.model.Cliente;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

public class ClienteDTO {
    private Long id;
    private String nome;
    private String cpf;
    private String data_nascimento;
    private String endereco;
    private String cep;

    public ClienteDTO() {
    }

    public ClienteDTO(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        this.cpf = cliente.getCpf();
        this.data_nascimento = cliente.getData_nascimento() != null
                ? cliente.getData_nascimento().toString()
                : null;
        this.endereco = cliente.getEndereco();
        this.cep = cliente.getCep();
    }

    public Cliente toEntity() {
        Cliente cliente = new Cliente();
        cliente.setId(this.id);
        cliente.setNome(this.nome);
        cliente.setCpf(this.cpf);
        cliente.setEndereco(this.endereco);
        cliente.setCep(this.cep);

        if (this.data_nascimento != null && !this.data_nascimento.isBlank()) {
            try {
                cliente.setData_nascimento(LocalDate.parse(this.data_nascimento));
            } catch (DateTimeParseException e) {
                // logar ou tratar a exceção de data inválida
                cliente.setData_nascimento(null);
            }
        }

        return cliente;
    }

    // Getters e Setters

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

    public String getData_nascimento() {
        return data_nascimento;
    }

    public void setData_nascimento(String data_nascimento) {
        this.data_nascimento = data_nascimento;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }
}
