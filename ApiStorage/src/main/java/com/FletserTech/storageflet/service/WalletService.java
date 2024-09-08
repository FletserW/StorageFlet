package com.FletserTech.storageflet.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FletserTech.storageflet.models.WalletModel;
import com.FletserTech.storageflet.repository.WalletRepository;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    public List<WalletModel> getAllWalletEntries() {
        return walletRepository.findAll();
    }

    public Optional<WalletModel> getWalletById(Long id) {
        return walletRepository.findById(id);
    }

    public WalletModel saveWallet(WalletModel wallet) {
        return walletRepository.save(wallet);
    }

    public void deleteWallet(Long id) {
        walletRepository.deleteById(id);
    }
}
