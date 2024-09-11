package com.FletserTech.storageflet.service;

import com.FletserTech.storageflet.dto.SalesDTO;
import com.FletserTech.storageflet.models.ProductModel;
import com.FletserTech.storageflet.models.SalesModel;
import com.FletserTech.storageflet.repository.ProductRepository;
import com.FletserTech.storageflet.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SalesService {

    @Autowired
    private SalesRepository salesRepository;

    @Autowired
    private ProductRepository productRepository;

    public SalesModel createSale(SalesDTO salesDTO) {
        // Encontrar o produto pelo ID
        ProductModel product = productRepository.findById(salesDTO.getProductId())
            .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        // Data atual para o registro monthYear
        LocalDate currentDate = LocalDate.now();
        String monthYear = currentDate.getMonthValue() + "-" + currentDate.getYear();

        // Verificar se já existe uma venda para esse produto no mês/ano atual
        SalesModel existingSale = salesRepository.findByProductIdAndMonthYear(salesDTO.getProductId(), monthYear);

        if (existingSale != null) {
            // Atualizar a quantidade existente somando a nova quantidade vendida
            existingSale.setQuantitySales(existingSale.getQuantitySales() + salesDTO.getQuantitySales());
            return salesRepository.save(existingSale);
        } else {
            // Criar um novo registro de venda
            SalesModel newSale = new SalesModel();
            newSale.setProduct(product);
            newSale.setMonthYear(monthYear);
            newSale.setQuantitySales(salesDTO.getQuantitySales());
            return salesRepository.save(newSale);
        }
    }

    // Listar vendas por mês/ano
    public List<SalesModel> getSalesByMonthYear(String monthYear) {
        return salesRepository.findByMonthYear(monthYear);
    }

    // Buscar venda por ID
    public SalesModel getSaleById(Long id) {
        return salesRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venda não encontrada"));
    }

    // Atualizar venda
    public SalesModel updateSale(Long id, SalesDTO salesDTO) {
        SalesModel existingSale = salesRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venda não encontrada"));

        ProductModel product = productRepository.findById(salesDTO.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));

        existingSale.setProduct(product);
        existingSale.setMonthYear(salesDTO.getMonthYear());
        existingSale.setQuantitySales(salesDTO.getQuantitySales());

        return salesRepository.save(existingSale);
    }

    // Deletar venda
    public void deleteSale(Long id) {
        SalesModel sale = salesRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Venda não encontrada"));
        salesRepository.delete(sale);
    }

    // Método para buscar os 10 produtos mais vendidos por mês/ano
    public List<Object[]> getTopSalesByMonthYear(String monthYear) {
        return salesRepository.findTopSalesByMonthYear(monthYear);
    }
}
