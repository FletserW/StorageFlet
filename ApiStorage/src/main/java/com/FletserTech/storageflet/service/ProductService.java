package com.FletserTech.storageflet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FletserTech.storageflet.repository.ProductRepository;
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
        return productRepository.save(product);
    }

    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

}
