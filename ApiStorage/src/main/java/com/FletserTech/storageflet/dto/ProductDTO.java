package com.FletserTech.storageflet.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductDTO {

    private Long id;

    @NotEmpty(message = "Name is required")
    private String name;

    @NotEmpty(message = "Amount is required")
    private Integer amount;

    @NotEmpty(message = "Price is required")
    private BigDecimal price;

    @NotEmpty(message = "Selling price is required")
    private BigDecimal sellingPrice;

    private Long supplierId; 
}

