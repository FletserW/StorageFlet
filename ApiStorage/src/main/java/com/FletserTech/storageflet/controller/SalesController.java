package com.FletserTech.storageflet.controller;

import com.FletserTech.storageflet.dto.SalesDTO;
import com.FletserTech.storageflet.models.SalesModel;
import com.FletserTech.storageflet.service.SalesService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/sales")
public class SalesController {

    @Autowired
    private SalesService salesService;

    @PostMapping("/register")
    public ResponseEntity<SalesModel> createSale(@RequestBody SalesDTO salesDTO) {
        SalesModel createdSale = salesService.createSale(salesDTO);
        return new ResponseEntity<>(createdSale, HttpStatus.CREATED);
    }
    
    // Listar vendas por mês/ano
    @GetMapping("/list")
    @Operation(summary = "Rota responsável por listar vendas por mês/ano")
    public ResponseEntity<List<SalesModel>> getSalesByMonthYear(@RequestParam String monthYear) {
        List<SalesModel> sales = salesService.getSalesByMonthYear(monthYear);
        return ResponseEntity.ok(sales);
    }

    // Testar a rota
    @GetMapping("/")
    @Operation(summary = "Rota responsável pelo teste de conexão")
    public String rota() {
        return "Api funcionando (Sales)";
    }

    // Buscar venda por ID
    @GetMapping("/{id}")
    @Operation(summary = "Rota responsável por buscar uma venda pelo ID")
    public ResponseEntity<SalesModel> getSaleById(@PathVariable Long id) {
        SalesModel sale = salesService.getSaleById(id);
        return ResponseEntity.ok(sale);
    }

    // Atualizar uma venda
    @PutMapping("/change/{id}")
    @Operation(summary = "Rota responsável por atualizar uma venda")
    public ResponseEntity<SalesModel> updateSale(@PathVariable Long id, @RequestBody SalesDTO salesDTO) {
        SalesModel updatedSale = salesService.updateSale(id, salesDTO);
        return ResponseEntity.ok(updatedSale);
    }

    // Deletar uma venda
    @DeleteMapping("/remove/{id}")
    @Operation(summary = "Rota responsável por deletar uma venda")
    public ResponseEntity<Void> deleteSale(@PathVariable Long id) {
        salesService.deleteSale(id);
        return ResponseEntity.noContent().build();
    }

    // Nova rota para listar os 10 produtos mais vendidos por mês/ano
    @GetMapping("/top-sales")
    @Operation(summary = "Rota responsável por listar os 10 produtos mais vendidos por mês/ano")
    public ResponseEntity<List<Object[]>> getTopSales(@RequestParam String monthYear) {
        List<Object[]> topSales = salesService.getTopSalesByMonthYear(monthYear);
        return ResponseEntity.ok(topSales);
    }

}
