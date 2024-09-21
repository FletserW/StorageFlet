package com.FletserTech.storageflet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FletserTech.storageflet.models.ItemRequestModel;

@Repository
public interface ItemRequestRepository extends JpaRepository<ItemRequestModel, Long> {
}

