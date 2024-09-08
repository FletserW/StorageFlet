package com.FletserTech.storageflet.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductStockDTO {
    private Long id;
    private String name;
    private BigDecimal price;
    private BigDecimal sellingPrice;
    private String enterprise;
    private Integer quantity;
    private Integer amount;
    
}
