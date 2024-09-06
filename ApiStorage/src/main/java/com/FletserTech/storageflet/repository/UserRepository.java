package com.FletserTech.storageflet.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.FletserTech.storageflet.models.UserModel;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Long> {
    Optional<UserModel> findByEmail(String email);
}
