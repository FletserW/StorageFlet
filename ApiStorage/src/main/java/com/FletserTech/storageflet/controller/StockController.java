package com.FletserTech.storageflet.controller;

import com.FletserTech.storageflet.dto.StockDTO;
import com.FletserTech.storageflet.models.ProductModel;
import com.FletserTech.storageflet.models.StockModel;
import com.FletserTech.storageflet.repository.ProductRepository;
import com.FletserTech.storageflet.service.StockService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/stocks")
public class StockController {

    @Autowired
    private StockService stockService;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/list")
    @Operation(summary = "Rota responsável por listar produtos em estoque")
    public List<StockDTO> getAllStocks() {
        return stockService.findAll().stream().map(stock -> {
            StockDTO dto = new StockDTO();
            dto.setId(stock.getId());
            dto.setProductId(stock.getProduct().getId()); // Passa apenas o ID do produto
            dto.setAmount(stock.getAmount());
            return dto;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Rota responsável por buscar produto em estoque por ID")
    public ResponseEntity<StockDTO> getStockById(@PathVariable Long id) {
        Optional<StockModel> stock = stockService.findById(id);
        return stock.map(s -> {
            StockDTO dto = new StockDTO();
            dto.setId(s.getId());
            dto.setProductId(s.getProduct().getId());
            dto.setAmount(s.getAmount());
            return ResponseEntity.ok(dto);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    @Operation(summary = "Rota responsável por registrar produtos em estoque")
    public ResponseEntity<StockDTO> createStock(@RequestBody StockDTO stockDTO) {
        ProductModel product = productRepository.findById(stockDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        StockModel stockModel = new StockModel();
        stockModel.setProduct(product);
        stockModel.setAmount(stockDTO.getAmount());

        StockModel savedStock = stockService.save(stockModel);

        StockDTO responseDTO = new StockDTO();
        responseDTO.setId(savedStock.getId());
        responseDTO.setProductId(savedStock.getProduct().getId());
        responseDTO.setAmount(savedStock.getAmount());

        return ResponseEntity.ok(responseDTO);
    }

    @PutMapping("/change/{id}")
    @Operation(summary = "Rota responsável por alterar um produto em estoque")
    public ResponseEntity<StockDTO> updateStock(@PathVariable Long id, @RequestBody StockDTO stockDTO) {
        Optional<StockModel> stock = stockService.findById(id);
        if (stock.isPresent()) {
            StockModel updatedStock = stock.get();
            ProductModel product = productRepository.findById(stockDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            updatedStock.setProduct(product);
            updatedStock.setAmount(stockDTO.getAmount());

            StockModel savedStock = stockService.save(updatedStock);

            StockDTO responseDTO = new StockDTO();
            responseDTO.setId(savedStock.getId());
            responseDTO.setProductId(savedStock.getProduct().getId());
            responseDTO.setAmount(savedStock.getAmount());

            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/remove/{id}")
    @Operation(summary = "Rota responsável por remover um produto em estoque")
    public ResponseEntity<Void> deleteStock(@PathVariable Long id) {
        if (stockService.findById(id).isPresent()) {
            stockService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/")
    @Operation(summary = "Rota responsável pelo teste de conexão")
    public String rota() {
        return "Api funcionando stocks";
    }
}
