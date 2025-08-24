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

    // Repositório injetado para operações CRUD no banco de dados
    @Autowired
    private ClienteRepository clienteRepository;

    // Endpoint POST: cria um novo cliente a partir de um DTO
    @PostMapping("/criar_cliente")
    public ResponseEntity<ClienteDTO> criarCliente(@RequestBody ClienteDTO clienteDTO) {
        // Log simples para auxiliar depuração local
        System.out.println("Recebido DTO: " + clienteDTO.getCep());

        // Converte DTO em entidade e persiste
        Cliente cliente = clienteDTO.toEntity();
        System.out.println("Salvando cliente: " + cliente.getCep());

        cliente = clienteRepository.save(cliente);
        // Retorna 201 Created com o DTO do cliente salvo
        return ResponseEntity.status(HttpStatus.CREATED).body(new ClienteDTO(cliente));
    }

    // Endpoint PUT: edita um cliente existente identificado pelo id
    @PutMapping("/editar_cliente/{id}")
    public ResponseEntity<ClienteDTO> editarCliente(@PathVariable Long id, @RequestBody ClienteDTO clienteDTO) {
        // Busca o cliente existente ou lança 404 se não encontrado
        Cliente clienteExistente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

        // Converte o DTO recebido em entidade temporária para facilitar cópia de campos
        Cliente clienteAtualizado = clienteDTO.toEntity();
        // Atualiza campos permitidos do cliente existente
        clienteExistente.setNome(clienteAtualizado.getNome());
        clienteExistente.setCpf(clienteAtualizado.getCpf());
        clienteExistente.setData_nascimento(clienteAtualizado.getData_nascimento());
        clienteExistente.setEndereco(clienteAtualizado.getEndereco());
        clienteExistente.setCep(clienteAtualizado.getCep());

        // Persiste alterações e retorna o DTO atualizado
        clienteExistente = clienteRepository.save(clienteExistente);
        return ResponseEntity.ok(new ClienteDTO(clienteExistente));
    }

    // Endpoint DELETE: remove um cliente pelo id
    @DeleteMapping("/deletar_cliente/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable Long id) {
        // Verifica existência e lança 404 se não existir
        clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
        // Remove o cliente e retorna 204 No Content
        clienteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint GET: retorna a lista de todos os clientes
    @GetMapping
    public List<ClienteDTO> listaCliente() {
        return clienteRepository.findAll().stream()
                .map(ClienteDTO::new)
                .collect(Collectors.toList());
    }

    // Endpoint GET por id: retorna um cliente específico ou 404
    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> buscarClientePorId(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.map(c -> ResponseEntity.ok(new ClienteDTO(c)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint GET de busca: permite buscar por nome, CPF ou ambos
    @GetMapping("/buscar")
    public ResponseEntity<ClienteDTO> buscaPorNomeOuCpf(@RequestParam(required = false) String nome,
                                                        @RequestParam(required = false) String cpf) {
        Cliente cliente;

        // Seleciona a consulta apropriada conforme parâmetros fornecidos
        if (nome != null && cpf != null) {
            cliente = clienteRepository.findByNomeAndCpf(nome, cpf);
        } else if (nome != null) {
            cliente = clienteRepository.findByNome(nome);
        } else if (cpf != null) {
            cliente = clienteRepository.findByCpf(cpf);
        } else {
            // Requisição inválida quando nenhum parâmetro é informado
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe ao menos o Nome ou CPF do cliente.");
        }

        // Retorna 404 quando não encontrado
        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }

        // Retorna DTO do cliente encontrado
        return ResponseEntity.ok(new ClienteDTO(cliente));
    }
}
