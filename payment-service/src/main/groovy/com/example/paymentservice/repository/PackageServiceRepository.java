package com.example.paymentservice.repository;

import com.example.paymentservice.entity.PackageServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackageServiceRepository extends JpaRepository<PackageServiceEntity, String> {
    @Query("SELECT p FROM PackageServiceEntity p WHERE p.packageServiceID = :packageServiceID")
    PackageServiceEntity findPackageServiceByID(@Param("packageServiceID") String packageServiceID);

    @Query(value = "SELECT p FROM PackageServiceEntity p WHERE p.packageServiceName = :packageServiceName")
    PackageServiceEntity findPackageServiceByName(@Param("packageServiceName") String packageServiceName);

    @Query(value = "SELECT * FROM package_service AS p", nativeQuery = true)
    List<PackageServiceEntity> findAll();
}
