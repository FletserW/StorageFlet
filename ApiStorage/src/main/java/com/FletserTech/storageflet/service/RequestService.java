package com.FletserTech.storageflet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.FletserTech.storageflet.dto.ItemRequestDTO;
import com.FletserTech.storageflet.dto.RequestDTO;
import com.FletserTech.storageflet.models.ItemRequestModel;
import com.FletserTech.storageflet.models.ProductModel;
import com.FletserTech.storageflet.models.RequestModel;
import com.FletserTech.storageflet.models.Status;
import com.FletserTech.storageflet.models.SupplierModel;
import com.FletserTech.storageflet.repository.ItemRequestRepository;
import com.FletserTech.storageflet.repository.RequestRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @SuppressWarnings("unused")
    @Autowired
    private ItemRequestRepository itemRequestRepository;

    public void createOrderWithItems(RequestDTO orderRequest) {
        // Criar pedido
        RequestModel request = new RequestModel();
        request.setSupplier(new SupplierModel(orderRequest.getSupplierId()));
        request.setStatus(Status.PENDING);
        request.setDate(LocalDate.now());  // Define a data atual
        request.setTotalValue(BigDecimal.ZERO);  // Inicia o valor total em zero

        RequestModel savedRequest = requestRepository.save(request);

        // Inicializa o total do pedido
        BigDecimal totalValue = BigDecimal.ZERO;

        // Processa cada item no pedido
        for (ItemRequestDTO item : orderRequest.getItems()) {
            ItemRequestModel itemRequest = new ItemRequestModel();
            itemRequest.setRequest(savedRequest);
            itemRequest.setProduct(new ProductModel(item.getProductId()));
            itemRequest.setQuantity(item.getQuantity());

            // Calcula o valor total do produto
            BigDecimal itemTotal = item.getProductPrice().multiply(new BigDecimal(item.getQuantity()));
            totalValue = totalValue.add(itemTotal);

            itemRequestRepository.save(itemRequest);
        }

        // Atualiza o valor total do pedido
        savedRequest.setTotalValue(totalValue);
        requestRepository.save(savedRequest);
    }


    public List<RequestModel> findAll() {
        return requestRepository.findAll();
    }

    public Optional<RequestModel> findById(Long id) {
        return requestRepository.findById(id);
    }

    @Transactional
    public RequestModel save(RequestModel request) {
        return requestRepository.save(request);
    }

    @Transactional
    public void deleteById(Long id) {
        requestRepository.deleteById(id);
    }
}

