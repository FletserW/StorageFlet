package com.FletserTech.storageflet.controller;

import com.FletserTech.storageflet.models.ProductModel;
import com.FletserTech.storageflet.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/list")
    @Operation(summary = "Rota responsável por lista produtos ")
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

    @PutMapping("/change/{id}")
    @Operation(summary = "Rota responsável alterar produto")
    public ResponseEntity<ProductModel> updateProduct(@PathVariable Long id, @RequestBody ProductModel productDetails) {
        Optional<ProductModel> product = productService.findById(id);
        if (product.isPresent()) {
            ProductModel updatedProduct = product.get();
            updatedProduct.setName(productDetails.getName());
            updatedProduct.setAmount(productDetails.getAmount());
            updatedProduct.setPrice(productDetails.getPrice());
            updatedProduct.setSelling_price(productDetails.getSelling_price());
            updatedProduct.setId_supplier(productDetails.getId_supplier());
            return ResponseEntity.ok(productService.save(updatedProduct));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/remove/{id}")
    @Operation(summary = "Rota responsável remover produto")
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
