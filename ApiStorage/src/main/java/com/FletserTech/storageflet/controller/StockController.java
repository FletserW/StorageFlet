package com.FletserTech.storageflet.controller;

import com.FletserTech.storageflet.dto.ProductStockDTO;
import com.FletserTech.storageflet.dto.StockDTO;
import com.FletserTech.storageflet.models.ProductModel;
import com.FletserTech.storageflet.models.StockModel;
import com.FletserTech.storageflet.repository.ProductRepository;
import com.FletserTech.storageflet.repository.StockRepository;
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

    @Autowired
    private StockRepository stockRepository;

    @GetMapping("/list")
public List<StockDTO> getAllStocks() {
    List<StockModel> stocks = stockService.findAll();
    return stocks.stream().map(stock -> {
        StockDTO dto = new StockDTO();
        dto.setId(stock.getId());
        dto.setProductId(stock.getProduct().getId()); // Passa apenas o ID do produto
        dto.setAmount(stock.getAmount());
        return dto;
    }).collect(Collectors.toList());
}


    @GetMapping("/{id}")
    public ResponseEntity<StockModel> getStockById(@PathVariable Long id) {
        Optional<StockModel> stock = stockService.findById(id);
        return stock.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    public ResponseEntity<StockModel> createStock(@RequestBody Map<String, Object> stockData) {
        // Recupera o productId e amount do JSON
        Long productId = Long.parseLong(stockData.get("productId").toString());
        Integer amount = Integer.parseInt(stockData.get("amount").toString());

        // Carrega o produto do banco de dados
        ProductModel product = productRepository.findById(productId)
                            .orElseThrow(() -> new RuntimeException("Product not found"));

        // Cria um novo StockModel e define os valores
        StockModel stockModel = new StockModel();
        stockModel.setProduct(product);
        stockModel.setAmount(amount);

        // Salva o estoque
        StockModel savedStock = stockService.save(stockModel);

        return ResponseEntity.ok(savedStock);
    }

    @GetMapping("/products")
public ResponseEntity<List<ProductStockDTO>> getProductStock() {
    List<ProductStockDTO> productStockList = stockRepository.findAll().stream().map(stock -> {
        ProductStockDTO dto = new ProductStockDTO();
        dto.setName(stock.getProduct().getName());
        dto.setPrice(stock.getProduct().getPrice());
        dto.setSellingPrice(stock.getProduct().getSellingPrice());
        dto.setEnterprise(stock.getProduct().getSupplier().getEnterprise());
        dto.setAmount(stock.getAmount());
        return dto;
    }).collect(Collectors.toList());

    return ResponseEntity.ok(productStockList);
}




    @PutMapping("/change/{id}")
    public ResponseEntity<StockModel> updateStock(@PathVariable Long id, @RequestBody StockModel stockDetails) {
        Optional<StockModel> stock = stockService.findById(id);
        if (stock.isPresent()) {
            StockModel updatedStock = stock.get();
            updatedStock.setProduct(stockDetails.getProduct());
            updatedStock.setAmount(stockDetails.getAmount());
            return ResponseEntity.ok(stockService.save(updatedStock));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/remove/{id}")
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
