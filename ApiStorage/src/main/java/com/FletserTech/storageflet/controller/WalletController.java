package com.FletserTech.storageflet.controller;

import com.FletserTech.storageflet.dto.WalletDTO;
import com.FletserTech.storageflet.models.WalletModel;
import com.FletserTech.storageflet.service.WalletService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/wallets")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @PostMapping("/register")
    @Operation(summary = "Rota responsável pela criação de um novo registro de Wallet")
    public ResponseEntity<WalletModel> create(@RequestBody WalletDTO walletDTO) {
        WalletModel walletModel = new WalletModel();
        walletModel.setMonthYear(walletDTO.getMonthYear());
        walletModel.setSpentValue(walletDTO.getSpentValue());
        walletModel.setGainValue(walletDTO.getGainValue());
        walletModel.setLossValue(walletDTO.getLossValue());
        
        WalletModel savedWallet = walletService.saveWallet(walletModel);
        return ResponseEntity.ok(savedWallet);
    }

    @DeleteMapping("/remove/{id}")
    @Operation(summary = "Rota responsável pela remoção de um registro de Wallet")
    public ResponseEntity<Void> remove(@PathVariable long id) {
        if (walletService.getWalletById(id).isPresent()) {
            walletService.deleteWallet(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/change/{id}")
    @Operation(summary = "Rota responsável pela atualização de um registro de Wallet")
    public ResponseEntity<WalletModel> update(@PathVariable long id, @RequestBody WalletDTO walletDTO) {
        Optional<WalletModel> existingWallet = walletService.getWalletById(id);
        if (existingWallet.isPresent()) {
            WalletModel walletModel = existingWallet.get();
            walletModel.setMonthYear(walletDTO.getMonthYear());
            walletModel.setSpentValue(walletDTO.getSpentValue());
            walletModel.setGainValue(walletDTO.getGainValue());
            walletModel.setLossValue(walletDTO.getLossValue());

            WalletModel updatedWallet = walletService.saveWallet(walletModel);
            return ResponseEntity.ok(updatedWallet);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/list")
    @Operation(summary = "Rota responsável por listar todos os registros de Wallet")
    public ResponseEntity<Iterable<WalletModel>> list() {
        return ResponseEntity.ok(walletService.getAllWalletEntries());
    }

    @GetMapping("/")
    @Operation(summary = "Rota responsável pelo teste de conexão")
    public String testConnection() {
        return "API funcionando";
    }
}
