package com.FletserTech.storageflet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.FletserTech.storageflet.models.RequestModel;
import com.FletserTech.storageflet.service.RequestService;

import io.swagger.v3.oas.annotations.Operation;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @GetMapping("/list")
    @Operation(summary = "Rota responsável listar pedidos")
    public List<RequestModel> getAllRequests() {
        return requestService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Rota responsável por buscar pedido")
    public ResponseEntity<RequestModel> getRequestById(@PathVariable Long id) {
        Optional<RequestModel> request = requestService.findById(id);
        return request.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    @Operation(summary = "Rota responsável registrar pedido")
    public RequestModel createRequest(@RequestBody RequestModel request) {
        return requestService.save(request);
    }

    @PutMapping("/change/{id}")
    @Operation(summary = "Rota responsável alterar pedido")
    public ResponseEntity<RequestModel> updateRequest(@PathVariable Long id, @RequestBody RequestModel request) {
        if (!requestService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        request.setId(id);
        return ResponseEntity.ok(requestService.save(request));
    }

    @DeleteMapping("/remove/{id}")
    @Operation(summary = "Rota responsável remover pedido")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        if (!requestService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        requestService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

