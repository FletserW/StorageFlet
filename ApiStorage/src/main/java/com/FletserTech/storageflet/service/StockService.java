package com.FletserTech.storageflet.service;

import com.FletserTech.storageflet.models.StockModel;
import com.FletserTech.storageflet.repository.StockRepository;
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
        return stockRepository.save(stock);
    }

    public void deleteById(Long id) {
        stockRepository.deleteById(id);
    }
}
