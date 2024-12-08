package com.example.userservice.repository;

import com.example.userservice.entity.RecruitmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitmentRepository extends JpaRepository<RecruitmentEntity, String> {
    @Query("SELECT r FROM RecruitmentEntity r WHERE r.title = :title")
    RecruitmentEntity findRecruitmentByTitle(@Param("title") String title);

    @Query("SELECT r FROM RecruitmentEntity r WHERE r.recruitmentID = :recruitmentID")
    RecruitmentEntity findRecruitmentByID(@Param("recruitmentID") String recruitmentID);
}
