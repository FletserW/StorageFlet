package com.FletserTech.storageflet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.FletserTech.storageflet.models.ItemRequestModel;
import com.FletserTech.storageflet.service.ItemRequestService;

import io.swagger.v3.oas.annotations.Operation;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/items-requests")
public class ItemRequestController {

    @Autowired
    private ItemRequestService itemRequestService;

    @GetMapping("/list")
    @Operation(summary = "Rota responsável por listar itens pedidos")
    public List<ItemRequestModel> getAllItemsRequests() {
        return itemRequestService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Rota responsável por buscar itens pedidos")
    public ResponseEntity<ItemRequestModel> getItemRequestById(@PathVariable Long id) {
        Optional<ItemRequestModel> itemRequest = itemRequestService.findById(id);
        return itemRequest.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    @Operation(summary = "Rota responsável por registrar itens pedidos")
    public ItemRequestModel createItemRequest(@RequestBody ItemRequestModel itemRequest) {
        return itemRequestService.save(itemRequest);
    }

    @PutMapping("/change/{id}")
    @Operation(summary = "Rota responsável por alterar itens pedidos")
    public ResponseEntity<ItemRequestModel> updateItemRequest(@PathVariable Long id, @RequestBody ItemRequestModel itemRequest) {
        if (!itemRequestService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        itemRequest.setId(id);
        return ResponseEntity.ok(itemRequestService.save(itemRequest));
    }

    @DeleteMapping("/remove/{id}")
    @Operation(summary = "Rota responsável por remover itens pedidos")
    public ResponseEntity<Void> deleteItemRequest(@PathVariable Long id) {
        if (!itemRequestService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        itemRequestService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

