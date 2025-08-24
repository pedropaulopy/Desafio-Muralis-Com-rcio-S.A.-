package com.example.DesafioMuralis.dto;

import com.example.DesafioMuralis.model.Cliente;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;

// DTO simples para transferência de dados do Cliente entre frontend e backend
public class ClienteDTO {
    // Identificador do cliente (pode ser null para novos registros)
    private Long id;
    // Nome completo do cliente
    private String nome;
    // CPF do cliente (formato numérico ou formatado)
    private String cpf;
    // Data de nascimento em formato String (ISO, ex: 2000-01-01)
    private String data_nascimento;
    // Endereço completo como texto
    private String endereco;
    // CEP relacionado ao endereço (apenas números)
    private String cep;

    // Construtor vazio para desserialização
    public ClienteDTO() {
    }

    // Constrói DTO a partir da entidade Cliente (usado ao enviar dados ao frontend)
    public ClienteDTO(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        this.cpf = cliente.getCpf();
        this.data_nascimento = cliente.getData_nascimento() != null
                ? cliente.getData_nascimento().toString() // LocalDate -> String (ISO)
                : null;
        this.endereco = cliente.getEndereco();
        this.cep = cliente.getCep();
    }

    // Converte o DTO em entidade Cliente (usado ao receber dados do frontend)
    public Cliente toEntity() {
        Cliente cliente = new Cliente();
        cliente.setId(this.id);
        cliente.setNome(this.nome);
        cliente.setCpf(this.cpf);
        cliente.setEndereco(this.endereco);
        cliente.setCep(this.cep);

        // Tenta converter a data de nascimento quando fornecida; em caso de falha, define como null
        if (this.data_nascimento != null && !this.data_nascimento.isBlank()) {
            try {
                cliente.setData_nascimento(LocalDate.parse(this.data_nascimento));
            } catch (DateTimeParseException e) {
                // Data inválida: evita lançar exceção e define campo como nulo
                cliente.setData_nascimento(null);
            }
        }

        return cliente;
    }

    // Getters e Setters (simples acesso aos campos do DTO)

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
