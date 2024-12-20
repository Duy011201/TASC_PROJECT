package com.example.paymentservice.repository;

import com.example.paymentservice.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, String> {
    @Query("SELECT p FROM PaymentEntity p WHERE p.paymentID = :paymentID")
    PaymentEntity findPaymentByID(@Param("paymentID") String paymentID);

    @Query("SELECT p FROM PaymentEntity p WHERE p.packageServiceID = :packageServiceID")
    PaymentEntity findPaymentByPackageServiceID(@Param("packageServiceID") String packageServiceID);

    @Query(value = "SELECT * FROM payment AS p", nativeQuery = true)
    List<PaymentEntity> findAll();
}
