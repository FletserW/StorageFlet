package com.FletserTech.storageflet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.FletserTech.storageflet.models.SalesModel;
import java.util.List;


@Repository
public interface SalesRepository extends JpaRepository<SalesModel, Long> {
    List<SalesModel> findByMonthYear(String monthYear);
    @Query("SELECT p.name, SUM(s.quantitySales) AS totalSales " +
       "FROM SalesModel s " +
       "JOIN s.product p " +
       "WHERE s.monthYear = :monthYear " +
       "GROUP BY p.name " +
       "ORDER BY totalSales DESC")
List<Object[]> findTopSalesByMonthYear(@Param("monthYear") String monthYear);
SalesModel findByProductIdAndMonthYear(Long productId, String monthYear);

}
