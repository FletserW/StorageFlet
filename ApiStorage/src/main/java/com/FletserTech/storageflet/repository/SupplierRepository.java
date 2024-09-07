package com.FletserTech.storageflet.repository;

import com.FletserTech.storageflet.models.SupplierModel;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<SupplierModel, Long> {
    
}
