package com.FletserTech.storageflet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FletserTech.storageflet.models.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long>{

}
