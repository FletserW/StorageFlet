package com.FletserTech.storageflet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FletserTech.storageflet.models.WalletModel;
@Repository
public interface WalletRepository extends JpaRepository<WalletModel, Long> {
    
}
