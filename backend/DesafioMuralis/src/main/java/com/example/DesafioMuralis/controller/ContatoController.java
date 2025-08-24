package com.example.DesafioMuralis.controller;

// Importações essenciais para controle REST e acesso a repositórios
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/contatos")
// Controlador REST responsável por operações CRUD de contatos vinculados a clientes
public class ContatoController {
     // Repositório para persistência dos contatos
     @Autowired
    private ContatoRepository contatoRepository;

    // Repositório para validação e associação com Cliente
    @Autowired
    private ClienteRepository clienteRepository;

    // Lista todos os contatos de um cliente específico (verifica existência do cliente antes)
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/listar_contatos/{clienteId}")
    public List<Contato> listarPorCliente(@PathVariable Long clienteId) {
        // Verifica se o cliente existe; lança 404 caso contrário
        @SuppressWarnings("unused")
        Cliente cliente = clienteRepository.findById(clienteId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
        // Retorna os contatos vinculados ao cliente
        return contatoRepository.findByClienteId(clienteId);
    }

    // Cria um novo contato e associa ao cliente informado (retorna 201 Created)
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/criar_contato/{clienteId}")
    public ResponseEntity<Contato> criarContato(@PathVariable Long clienteId, @RequestBody Contato contato) {
        // Busca o cliente e valida sua existência
        Cliente cliente = clienteRepository.findById(clienteId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

        // Associa o contato ao cliente e persiste
        contato.setCliente(cliente);
        Contato salvo = contatoRepository.save(contato);
        // Retorna o contato criado com status 201
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
}

    // Atualiza um contato existente garantindo que pertence ao cliente informado
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/atualizar_contatos/{clienteId}/{id}")
    public ResponseEntity<Contato> atualizarContato(
        @PathVariable Long clienteId,
        @PathVariable Long id,
        @RequestBody Contato contatoAtualizado) {

            // Valida existência do cliente
            Cliente cliente = clienteRepository.findById(clienteId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

            // Busca o contato por id e valida existência
            Contato contato = contatoRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contato não encontrado"));

            // Garante que o contato realmente pertence ao cliente informado
            if (!contato.getCliente().getId().equals(cliente.getId())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Contato não pertence ao cliente informado.");
            }

            // Atualiza campos permitidos do contato
            contato.setTipo(contatoAtualizado.getTipo());
            contato.setValor(contatoAtualizado.getValor());
            contato.setObservacao(contatoAtualizado.getObservacao());

            // Persiste e retorna o contato atualizado
            Contato salvo = contatoRepository.save(contato);

            return ResponseEntity.ok(salvo);
    }

    // Deleta um contato garantindo vínculo com o cliente e retorna 204 No Content
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/deletar_contato/{clienteId}/{id}")
    public ResponseEntity<Contato> deletarContato(
        @PathVariable Long clienteId,
        @PathVariable Long id) {

            // Valida cliente
            Cliente cliente = clienteRepository.findById(clienteId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

            // Valida existência do contato
            Contato contato = contatoRepository.findById(id)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contato não encontrado"));

            // Verifica vínculo entre contato e cliente antes de excluir
            if (!contato.getCliente().getId().equals(cliente.getId())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Contato não pertence ao cliente informado.");
            }

            // Remove o contato do repositório
            contatoRepository.delete(contato);

        // Resposta vazia com status 204 No Content para indicar sucesso na deleção
        return ResponseEntity.noContent().build();
    }

}
