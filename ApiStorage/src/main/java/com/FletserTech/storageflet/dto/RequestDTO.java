package com.FletserTech.storageflet.dto;

import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class RequestDTO {

    private Long id;
    private LocalDate date;
    private Long supplierId;
    private BigDecimal totalValue;
    private String status;
    private Set<ItemRequestDTO> items;
}
