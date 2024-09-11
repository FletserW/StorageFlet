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

    public StockModel save(StockModel stockModel) {
        // Verificar se já existe um estoque para o produto
        Optional<StockModel> existingStock = stockRepository.findByProductId(stockModel.getProduct().getId());

        if (existingStock.isPresent()) {
            // Se já existe, atualize a quantidade
            StockModel stock = existingStock.get();
            stock.setQuantity(stockModel.getQuantity());
            return stockRepository.save(stock);
        } else {
            // Caso contrário, crie um novo estoque
            return stockRepository.save(stockModel);
        }
    }

    public void deleteById(Long id) {
        // Verifica se o estoque existe antes de tentar deletar
        if (!stockRepository.existsById(id)) {
            throw new EntityExistsException("Stock with ID " + id + " does not exist");
        }
        stockRepository.deleteById(id);
    }
}
