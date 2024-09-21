package com.FletserTech.storageflet.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemRequestDTO {

    private Long id;
    private Long productId;
    private Integer quantity;
    private BigDecimal productPrice;
}

