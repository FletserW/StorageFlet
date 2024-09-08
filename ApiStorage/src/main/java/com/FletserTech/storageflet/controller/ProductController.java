package com.FletserTech.storageflet.controller;

import com.FletserTech.storageflet.dto.ProductDTO;
import com.FletserTech.storageflet.dto.ProductStockDTO;
import com.FletserTech.storageflet.models.ProductModel;
import com.FletserTech.storageflet.models.StockModel;
import com.FletserTech.storageflet.models.SupplierModel;
import com.FletserTech.storageflet.service.ProductService;
import com.FletserTech.storageflet.service.StockService;
import com.FletserTech.storageflet.service.SupplierService;
import com.FletserTech.storageflet.repository.StockRepository;
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
    private SupplierService supplierService;

    @Autowired
    private StockService stockService;

    @GetMapping("/list")
    @Operation(summary = "Rota responsável por listar produtos")
    public List<ProductDTO> getAllProducts() {
        return productService.findAll().stream().map(product -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setAmount(product.getAmount());
            dto.setPrice(product.getPrice());
            dto.setSellingPrice(product.getSellingPrice());
            dto.setSupplierId(product.getSupplier().getId()); // Adiciona o ID do fornecedor
            return dto;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Rota responsável por buscar produto por ID")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        Optional<ProductModel> product = productService.findById(id);
        return product.map(p -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(p.getId());
            dto.setName(p.getName());
            dto.setAmount(p.getAmount());
            dto.setPrice(p.getPrice());
            dto.setSellingPrice(p.getSellingPrice());
            dto.setSupplierId(p.getSupplier().getId());
            return ResponseEntity.ok(dto);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/register")
    @Operation(summary = "Rota responsável por registrar um novo produto(adicioner ao stock)")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        ProductModel product = new ProductModel();
        product.setName(productDTO.getName());
        product.setAmount(productDTO.getAmount());
        product.setPrice(productDTO.getPrice());
        product.setSellingPrice(productDTO.getSellingPrice());

        // Configura o fornecedor
        if (productDTO.getSupplierId() != null) {
            Optional<SupplierModel> supplier = supplierService.findById(productDTO.getSupplierId());
            if (supplier.isPresent()) {
                product.setSupplier(supplier.get());
            } else {
                return ResponseEntity.badRequest().body(null); // Ou outra forma de indicar erro
            }
        } else {
            return ResponseEntity.badRequest().body(null); // Ou outra forma de indicar erro
        }

        // Salva o produto no banco
        ProductModel savedProduct = productService.save(product);

        // Cria um registro de estoque com quantidade 0 para o produto recém-criado
        StockModel stock = new StockModel();
        stock.setProduct(savedProduct);
        stock.setQuantity(0);  // Define a quantidade inicial como 0

        // Salva o estoque no banco
        stockService.save(stock);

        // Prepara o DTO de resposta
        ProductDTO responseDTO = new ProductDTO();
        responseDTO.setId(savedProduct.getId());
        responseDTO.setName(savedProduct.getName());
        responseDTO.setAmount(savedProduct.getAmount());
        responseDTO.setPrice(savedProduct.getPrice());
        responseDTO.setSellingPrice(savedProduct.getSellingPrice());
        responseDTO.setSupplierId(savedProduct.getSupplier().getId());

        return ResponseEntity.ok(responseDTO);
    }


    @PutMapping("/change/{id}")
    @Operation(summary = "Rota responsável por alterar um produto")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        Optional<ProductModel> product = productService.findById(id);
        if (product.isPresent()) {
            ProductModel updatedProduct = product.get();
            updatedProduct.setName(productDTO.getName());
            updatedProduct.setAmount(productDTO.getAmount());
            updatedProduct.setPrice(productDTO.getPrice());
            updatedProduct.setSellingPrice(productDTO.getSellingPrice());
            // Atualiza o fornecedor se necessário
            // updatedProduct.setSupplier(...);

            ProductModel savedProduct = productService.save(updatedProduct);

            ProductDTO responseDTO = new ProductDTO();
            responseDTO.setId(savedProduct.getId());
            responseDTO.setName(savedProduct.getName());
            responseDTO.setAmount(savedProduct.getAmount());
            responseDTO.setPrice(savedProduct.getPrice());
            responseDTO.setSellingPrice(savedProduct.getSellingPrice());
            responseDTO.setSupplierId(savedProduct.getSupplier().getId());

            return ResponseEntity.ok(responseDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/remove/{id}")
    @Operation(summary = "Rota responsável por remover um produto")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.findById(id).isPresent()) {
            productService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/stocks")
    @Operation(summary = "Rota responsável por listar produtos com estoque")
    public ResponseEntity<List<ProductStockDTO>> getProductStock() {
        List<ProductStockDTO> productStockList = stockService.findAll().stream().map(stock -> {
            ProductStockDTO dto = new ProductStockDTO();
            dto.setId(stock.getProduct().getId()); // ID do produto
            dto.setName(stock.getProduct().getName()); // Nome do produto
            dto.setPrice(stock.getProduct().getPrice()); // Preço do produto
            dto.setSellingPrice(stock.getProduct().getSellingPrice()); // Preço de venda do produto
            dto.setEnterprise(stock.getProduct().getSupplier().getEnterprise()); // Empresa fornecedora
            dto.setQuantity(stock.getQuantity()); // Quantidade em estoque
            dto.setAmount(stock.getProduct().getAmount()); // Quantidade total do produto
            return dto;
        }).collect(Collectors.toList());
    
        return ResponseEntity.ok(productStockList);
    }
    

    @GetMapping("/")
    @Operation(summary = "Rota responsável pelo teste de conexão")
    public String rota() {
        return "Api funcionando products";
    }
}
