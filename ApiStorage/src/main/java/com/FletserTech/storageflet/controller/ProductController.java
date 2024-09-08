package com.FletserTech.storageflet.controller;

import com.FletserTech.storageflet.dto.ProductStockDTO;
import com.FletserTech.storageflet.models.ProductModel;
import com.FletserTech.storageflet.service.ProductService;
import com.FletserTech.storageflet.repository.StockRepository; // Importe o StockRepository
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private StockRepository stockRepository; // Adicione a injeção do StockRepository

    @GetMapping("/list")
    @Operation(summary = "Rota responsável por listar produtos ")
    public List<ProductModel> getAllProducts() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Rota responsável por buscar produtos")
    public ResponseEntity<ProductModel> getProductById(@PathVariable Long id) {
        Optional<ProductModel> product = productService.findById(id);
        return product.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    @Operation(summary = "Rota responsável por registrar produto")
    public ProductModel createProduct(@RequestBody ProductModel product) {
        return productService.save(product);
    }

    @GetMapping("/stocks/products")
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
    @Operation(summary = "Rota responsável por alterar produto")
    public ResponseEntity<ProductModel> updateProduct(@PathVariable Long id, @RequestBody ProductModel productDetails) {
        Optional<ProductModel> product = productService.findById(id);
        if (product.isPresent()) {
            ProductModel updatedProduct = product.get();
            updatedProduct.setName(productDetails.getName());
            updatedProduct.setAmount(productDetails.getAmount());
            updatedProduct.setPrice(productDetails.getPrice());
            updatedProduct.setSellingPrice(productDetails.getSellingPrice());
            updatedProduct.setSupplier(productDetails.getSupplier());
            return ResponseEntity.ok(productService.save(updatedProduct));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/remove/{id}")
    @Operation(summary = "Rota responsável por remover produto")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.findById(id).isPresent()) {
            productService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/")
    @Operation(summary = "Rota responsável pelo teste de conexão")
    public String rota() {
        return "Api funcionando products";
    }
}
