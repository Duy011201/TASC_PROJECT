package com.example.userservice.service;

import com.example.userservice.dto.CompanyDto;
import com.example.userservice.dto.RecruitmentDto;
import com.example.userservice.util.HandleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RecruitmentService {
    public ResponseEntity<HandleResponse<RecruitmentDto>> createRecruitment(RecruitmentDto recruitmentDto);
    public ResponseEntity<HandleResponse> deleteRecruitmentByID (RecruitmentDto recruitmentDto);
    public ResponseEntity<HandleResponse> updateRecruitmentByID (RecruitmentDto recruitmentDto);
    public ResponseEntity<HandleResponse> updateStatusRecruitmentByID (RecruitmentDto recruitmentDto);
    public ResponseEntity<HandleResponse<List<RecruitmentDto>>> getAllRecruitment(RecruitmentDto recruitmentDto);
}
