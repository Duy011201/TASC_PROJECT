package com.example.fileservice.repository;

import com.example.fileservice.entity.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, String> {
    @Query("SELECT f FROM FileEntity f WHERE f.fileID = :fileID")
    FileEntity findFileByID(@Param("fileID") String fileID);
}
