package com.FletserTech.storageflet.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SalesDTO {

    @NotNull
    private Long productId;
    @NotNull
    private String monthYear;
    @NotNull
    private Integer quantitySales;
}
