package com.FletserTech.storageflet.service;

import com.FletserTech.storageflet.models.SupplierModel;
import com.FletserTech.storageflet.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public List<SupplierModel> findAll() {
        return supplierRepository.findAll();
    }

    public Optional<SupplierModel> findById(Long id) {
        return supplierRepository.findById(id);
    }

    public SupplierModel save(SupplierModel supplier) {
        return supplierRepository.save(supplier);
    }

    public void deleteById(Long id) {
        supplierRepository.deleteById(id);
    }
}