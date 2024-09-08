package com.FletserTech.storageflet.service;

import com.FletserTech.storageflet.models.StockModel;
import com.FletserTech.storageflet.repository.StockRepository;

import jakarta.persistence.EntityExistsException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public List<StockModel> findAll() {
        return stockRepository.findAll();
    }

    public Optional<StockModel> findById(Long id) {
        return stockRepository.findById(id);
    }

    public StockModel save(StockModel stock) {
        // Validações adicionais podem ser adicionadas aqui
        if (stock.getProduct() == null) {
            throw new IllegalArgumentException("Stock must have a product associated");
        }

        // Verifica se já existe um estoque para o produto
        if (stockRepository.existsById(stock.getProduct().getId())) {
            throw new IllegalArgumentException("Stock for this product already exists");
        }

        return stockRepository.save(stock);
    }

    public void deleteById(Long id) {
        // Verifica se o estoque existe antes de tentar deletar
        if (!stockRepository.existsById(id)) {
            throw new EntityExistsException("Stock with ID " + id + " does not exist");
        }
        stockRepository.deleteById(id);
    }
}
