package com.example.DesafioMuralis.controller;

import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.DesafioMuralis.model.Cliente;
import com.example.DesafioMuralis.repository.ClienteRepository;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/clientes")
public class ClienteController {
    @Autowired
    private ClienteRepository clienteRepository;
   
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/criar_cliente")
    public ResponseEntity<Cliente> criarCliente(@RequestBody Cliente cliente){
        clienteRepository.save(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(cliente);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/editar_cliente/{id}")
    public Cliente editarCliente(@PathVariable Long id, @RequestBody Cliente clienteAtualizado) {
        Cliente cliente = clienteRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));

        cliente.setNome(clienteAtualizado.getNome());
        cliente.setCpf(clienteAtualizado.getCpf());
        cliente.setData_nascimento(clienteAtualizado.getData_nascimento());
        cliente.setEndereco(clienteAtualizado.getEndereco());

        return clienteRepository.save(cliente);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/deletar_cliente/{id}")
    public ResponseEntity<Void> deletarCliente(@PathVariable Long id){
        clienteRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
        clienteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping() //usa o do requestmapping
    List<Cliente> listaCliente(){
        return clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarClientePorId(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return cliente.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
}


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/buscar")
    public Cliente buscaPorNomeOuCpf(@RequestParam(required=false) String nome, @RequestParam(required=false) String cpf){
        if(nome!=null && cpf!=null){
            return clienteRepository.findByNomeAndCpf(nome, cpf);
        }
        else if(nome!=null){
            return clienteRepository.findByNome(nome);
        }
        else if(cpf!=null){
            return clienteRepository.findByCpf(cpf);
        }
        else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe ao menos o Nome ou CPF do cliente.");
        }
    }
}
