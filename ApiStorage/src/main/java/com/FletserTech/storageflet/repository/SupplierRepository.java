package com.FletserTech.storageflet.repository;

import com.FletserTech.storageflet.models.SupplierModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<SupplierModel, Long> {
    
}
