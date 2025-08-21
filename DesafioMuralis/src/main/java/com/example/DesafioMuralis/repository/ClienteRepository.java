package com.example.DesafioMuralis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.DesafioMuralis.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Cliente findByNome(String nome);
    Cliente findByCpf(String cpf);
    Cliente findByNomeAndCpf(String nome, String cpf);
}