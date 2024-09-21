package com.FletserTech.storageflet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FletserTech.storageflet.models.ItemRequestModel;
import com.FletserTech.storageflet.repository.ItemRequestRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ItemRequestService {

    @Autowired
    private ItemRequestRepository itemRequestRepository;

    public List<ItemRequestModel> findAll() {
        return itemRequestRepository.findAll();
    }

    public Optional<ItemRequestModel> findById(Long id) {
        return itemRequestRepository.findById(id);
    }

    public ItemRequestModel save(ItemRequestModel itemRequest) {
        return itemRequestRepository.save(itemRequest);
    }

    public void deleteById(Long id) {
        itemRequestRepository.deleteById(id);
    }
}

