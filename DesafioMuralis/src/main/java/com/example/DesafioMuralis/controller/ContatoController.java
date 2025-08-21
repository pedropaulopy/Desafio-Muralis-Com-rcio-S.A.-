package com.example.DesafioMuralis.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.DesafioMuralis.model.Cliente;
import com.example.DesafioMuralis.model.Contato;
import com.example.DesafioMuralis.repository.ClienteRepository;
import com.example.DesafioMuralis.repository.ContatoRepository;

@RestController
@RequestMapping("/contatos")
public class ContatoController {
     @Autowired
    private ContatoRepository contatoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/listar_contatos/{clienteId}")
    public List<Contato> listarPorCliente(@PathVariable Long clienteId) {
        @SuppressWarnings("unused")
        Cliente cliente = clienteRepository.findById(clienteId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
        return contatoRepository.findByClienteId(clienteId);
    }

    @PostMapping("/criar_contato/{clienteId}")
    public ResponseEntity<Contato> criarContato(@PathVariable Long clienteId, @RequestBody Contato contato) {
        Cliente cliente = clienteRepository.findById(clienteId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

        contato.setCliente(cliente);
        Contato salvo = contatoRepository.save(contato);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/atualizar_contatos/{clienteId}/{id}")
    public ResponseEntity<Contato> atualizarContato(
        @PathVariable Long clienteId,
        @PathVariable Long id,
        @RequestBody Contato contatoAtualizado) {

            Cliente cliente = clienteRepository.findById(clienteId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

            Contato contato = contatoRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contato não encontrado"));

            if (!contato.getCliente().getId().equals(cliente.getId())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Contato não pertence ao cliente informado.");
            }

            contato.setTipo(contatoAtualizado.getTipo());
            contato.setValor(contatoAtualizado.getValor());
            contato.setObservacao(contatoAtualizado.getObservacao());

            Contato salvo = contatoRepository.save(contato);

            return ResponseEntity.ok(salvo);
    }

    @DeleteMapping("/deletar_contato/{clienteId}/{id}")
    public ResponseEntity<Contato> deletarContato(
        @PathVariable Long clienteId,
        @PathVariable Long id,
        @RequestBody Contato contatoAtualizado) {

            Cliente cliente = clienteRepository.findById(clienteId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

            Contato contato = contatoRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contato não encontrado"));

            if (!contato.getCliente().getId().equals(cliente.getId())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Contato não pertence ao cliente informado.");
            }

            // Deleta o contato
            contatoRepository.delete(contato);

        // Retorna resposta vazia com status 204 No Content
        return ResponseEntity.noContent().build();
    }

}
