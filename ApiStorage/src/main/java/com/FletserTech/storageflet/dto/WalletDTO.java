package com.FletserTech.storageflet.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class WalletDTO {
    private Long id;
    private String monthYear;
    private BigDecimal spentValue;
    private BigDecimal gainValue;
    private BigDecimal lossValue;
}
