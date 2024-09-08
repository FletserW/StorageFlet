package com.FletserTech.storageflet.controller;

import com.FletserTech.storageflet.dto.SupplierDTO;
import com.FletserTech.storageflet.models.SupplierModel;
import com.FletserTech.storageflet.service.SupplierService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/suppliers")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping("/list")
    @Operation(summary = "Rota responsável por listar fornecedores")
    public List<SupplierDTO> getAllSuppliers() {
        return supplierService.findAll().stream().map(supplier -> {
            SupplierDTO dto = new SupplierDTO();
            dto.setId(supplier.getId());
            dto.setEnterprise(supplier.getEnterprise());
            dto.setContact(supplier.getContact());
            dto.setEmail(supplier.getEmail());
            dto.setTelephone(supplier.getTelephone());
            return dto;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Rota responsável por buscar fornecedor por ID")
    public ResponseEntity<SupplierDTO> getSupplierById(@PathVariable Long id) {
        Optional<SupplierModel> supplier = supplierService.findById(id);
        return supplier.map(s -> {
            SupplierDTO dto = new SupplierDTO();
            dto.setId(s.getId());
            dto.setEnterprise(s.getEnterprise());
            dto.setContact(s.getContact());
            dto.setEmail(s.getEmail());
            dto.setTelephone(s.getTelephone());
            return ResponseEntity.ok(dto);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    @Operation(summary = "Rota responsável por registrar um novo fornecedor")
    public ResponseEntity<SupplierDTO> createSupplier(@RequestBody SupplierDTO supplierDTO) {
        SupplierModel supplier = new SupplierModel();
        supplier.setEnterprise(supplierDTO.getEnterprise());
        supplier.setContact(supplierDTO.getContact());
        supplier.setEmail(supplierDTO.getEmail());
        supplier.setTelephone(supplierDTO.getTelephone());

        SupplierModel savedSupplier = supplierService.save(supplier);

        SupplierDTO responseDTO = new SupplierDTO();
        responseDTO.setId(savedSupplier.getId());
        responseDTO.setEnterprise(savedSupplier.getEnterprise());
        responseDTO.setContact(savedSupplier.getContact());
        responseDTO.setEmail(savedSupplier.getEmail());
        responseDTO.setTelephone(savedSupplier.getTelephone());

        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/change/{id}")
    @Operation(summary = "Rota responsável por alterar um fornecedor")
    public ResponseEntity<SupplierDTO> updateSupplier(@PathVariable Long id, @RequestBody SupplierDTO supplierDTO) {
        Optional<SupplierModel> supplier = supplierService.findById(id);
        if (supplier.isPresent()) {
            SupplierModel updatedSupplier = supplier.get();
            updatedSupplier.setEnterprise(supplierDTO.getEnterprise());
            updatedSupplier.setContact(supplierDTO.getContact());
            updatedSupplier.setEmail(supplierDTO.getEmail());
            updatedSupplier.setTelephone(supplierDTO.getTelephone());

            SupplierModel savedSupplier = supplierService.save(updatedSupplier);

            SupplierDTO responseDTO = new SupplierDTO();
            responseDTO.setId(savedSupplier.getId());
            responseDTO.setEnterprise(savedSupplier.getEnterprise());
            responseDTO.setContact(savedSupplier.getContact());
            responseDTO.setEmail(savedSupplier.getEmail());
            responseDTO.setTelephone(savedSupplier.getTelephone());

            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/remove/{id}")
    @Operation(summary = "Rota responsável por remover um fornecedor")
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
    public String rota() {
        return "Api funcionando suppliers";
    }
}
