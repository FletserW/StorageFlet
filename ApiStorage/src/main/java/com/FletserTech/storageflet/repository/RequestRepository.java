package com.FletserTech.storageflet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FletserTech.storageflet.models.RequestModel;

@Repository
public interface RequestRepository extends JpaRepository<RequestModel, Long> {
}

