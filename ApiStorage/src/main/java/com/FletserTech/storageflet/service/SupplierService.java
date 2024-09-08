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
        // Validações adicionais podem ser adicionadas aqui
        if (supplier.getEnterprise() == null || supplier.getContact() == null ||
            supplier.getEmail() == null || supplier.getTelephone() == null) {
            throw new IllegalArgumentException("All supplier fields must be provided");
        }
        return supplierRepository.save(supplier);
    }

    public void deleteById(Long id) {
        // Verifica se o fornecedor existe antes de tentar deletar
        if (!supplierRepository.existsById(id)) {
            throw new jakarta.persistence.EntityNotFoundException("Supplier with ID " + id + " does not exist");
        }
        supplierRepository.deleteById(id);
    }
}
