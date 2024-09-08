package com.FletserTech.storageflet.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SupplierDTO {

    private Long id;

    @NotEmpty(message = "Enterprise is required")
    private String enterprise;

    @NotEmpty(message = "Contact is required")
    private String contact;

    @NotEmpty(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotEmpty(message = "Telephone is required")
    private String telephone;
}

