package com.FletserTech.storageflet.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "products")
public class ProductModel {

    public ProductModel(Long productId) {
        //TODO Auto-generated constructor stub
    }

     public ProductModel() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

  @NotEmpty
    private String name;

    @NotEmpty
    private Integer amount;

    @NotEmpty
    private BigDecimal price;

    @NotEmpty
    private BigDecimal sellingPrice;

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false) 
    private SupplierModel supplier;
}
