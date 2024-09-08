package com.FletserTech.storageflet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FletserTech.storageflet.repository.ProductRepository;

import jakarta.persistence.EntityNotFoundException;

import com.FletserTech.storageflet.models.ProductModel;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<ProductModel> findAll() {
        return productRepository.findAll();
    }

    public Optional<ProductModel> findById(Long id) {
        return productRepository.findById(id);
    }

    public ProductModel save(ProductModel product) {
        if (product.getName() == null || product.getSupplier() == null) {
            throw new IllegalArgumentException("Product name and supplier must not be null");
        }
        return productRepository.save(product);
    }

    public void deleteById(Long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Product with ID " + id + " does not exist");
        }
        productRepository.deleteById(id);
    }
}