package com.FletserTech.storageflet.controller;

import com.FletserTech.storageflet.models.SupplierModel;
import com.FletserTech.storageflet.service.SupplierService;

import io.swagger.v3.oas.annotations.Operation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/suppliers")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping("/list")
    @Operation(summary = "Rota responsável por listar fornecedores ")
    public List<SupplierModel> getAllSuppliers() {
        return supplierService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Rota responsável buscar fornecedor especifico")
    public ResponseEntity<SupplierModel> getSupplierById(@PathVariable Long id) {
        Optional<SupplierModel> supplier = supplierService.findById(id);
        return supplier.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    @Operation(summary = "Rota responsável registar novo fornecedor")
    public SupplierModel createSupplier(@RequestBody SupplierModel supplier) {
        return supplierService.save(supplier);
    }

    @PutMapping("/change/{id}")
    @Operation(summary = "Rota responsável auterar fornecedor ")
    public ResponseEntity<SupplierModel> updateSupplier(@PathVariable Long id, @RequestBody SupplierModel supplierDetails) {
        Optional<SupplierModel> supplier = supplierService.findById(id);
        if (supplier.isPresent()) {
            SupplierModel updatedSupplier = supplier.get();
            updatedSupplier.setEnterprise(supplierDetails.getEnterprise());
            updatedSupplier.setContact(supplierDetails.getContact());
            updatedSupplier.setEmail(supplierDetails.getEmail());
            updatedSupplier.setTelephone(supplierDetails.getTelephone());
            return ResponseEntity.ok(supplierService.save(updatedSupplier));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/remove/{id}")
    @Operation(summary = "Rota responsável remover fornecedor")
    public ResponseEntity<Void> deleteSupplier(@PathVariable Long id) {
        if (supplierService.findById(id).isPresent()) {
            supplierService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/")
    @Operation(summary = "Rota responsável pelo teste de conexão")
    public String rota(){
        return "Api funcionando suppliers";
    }
}

