package com.FletserTech.storageflet.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FletserTech.storageflet.models.StockModel;

@Repository
public interface StockRepository extends JpaRepository<StockModel, Long> {
    Optional<StockModel> findByProductId(Long productId);
}
