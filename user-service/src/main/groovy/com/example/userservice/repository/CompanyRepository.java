package com.example.userservice.repository;

import com.example.userservice.entity.CompanyEntity;
import com.example.userservice.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<CompanyEntity, String> {
    @Query("SELECT c FROM CompanyEntity c WHERE c.corporateTaxCode = :corporateTaxCode")
    CompanyEntity findCompanyByCorporateTaxCode(@Param("corporateTaxCode") String corporateTaxCode);

    @Query("SELECT c FROM CompanyEntity c WHERE c.companyID = :companyID")
    CompanyEntity findCompanyByID(@Param("companyID") String companyID);
}
