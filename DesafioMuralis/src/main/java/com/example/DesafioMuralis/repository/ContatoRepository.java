package com.example.DesafioMuralis.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.DesafioMuralis.model.Contato;

public interface ContatoRepository extends JpaRepository<Contato, Long> {
    List<Contato> findByClienteId(Long cliente_id);
}
