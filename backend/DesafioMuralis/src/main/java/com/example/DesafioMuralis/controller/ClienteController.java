package com.example.DesafioMuralis.controller;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.DesafioMuralis.model.Cliente;
import com.example.DesafioMuralis.repository.ClienteRepository;
import com.example.DesafioMuralis.dto.ClienteDTO;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/criar_cliente")
    public ResponseEntity<ClienteDTO> criarCliente(@RequestBody ClienteDTO clienteDTO) {
        System.out.println("Recebido DTO: " + clienteDTO.getCep());

        Cliente cliente = clienteDTO.toEntity();
        System.out.println("Salvando cliente: " + cliente.getCep());

        cliente = clienteRepository.save(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ClienteDTO(cliente));
    }

    @PutMapping("/editar_cliente/{id}")
    public ResponseEntity<ClienteDTO> editarCliente(@PathVariable Long id, @RequestBody ClienteDTO clienteDTO) {
        Cliente clienteExistente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

        Cliente clienteAtualizado = clienteDTO.toEntity();
        clienteExistente.setNome(clienteAtualizado.getNome());
        clienteExistente.setCpf(clienteAtualizado.getCpf());
        clienteExistente.setData_nascimento(clienteAtualizado.getData_nascimento());
        clienteExistente.setEndereco(clienteAtualizado.getEndereco());
        clienteExistente.setCep(clienteAtualizado.getCep());

        clienteExistente = clienteRepository.save(clienteExistente);
        return ResponseEntity.ok(new ClienteDTO(clienteExistente));
    }

    @DeleteMapping("/deletar_cliente/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable Long id) {
        clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
        clienteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<ClienteDTO> listaCliente() {
        return clienteRepository.findAll().stream()
                .map(ClienteDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> buscarClientePorId(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.map(c -> ResponseEntity.ok(new ClienteDTO(c)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<ClienteDTO> buscaPorNomeOuCpf(@RequestParam(required = false) String nome,
                                                        @RequestParam(required = false) String cpf) {
        Cliente cliente;

        if (nome != null && cpf != null) {
            cliente = clienteRepository.findByNomeAndCpf(nome, cpf);
        } else if (nome != null) {
            cliente = clienteRepository.findByNome(nome);
        } else if (cpf != null) {
            cliente = clienteRepository.findByCpf(cpf);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe ao menos o Nome ou CPF do cliente.");
        }

        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(new ClienteDTO(cliente));
    }
}
