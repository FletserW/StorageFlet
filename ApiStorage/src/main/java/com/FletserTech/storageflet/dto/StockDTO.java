package com.FletserTech.storageflet.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockDTO {

    private Long id;

    @NotNull(message = "Product ID is required")
    private Long productId; 

    @NotNull(message = "Amount is required")
    private Integer amount;
}
