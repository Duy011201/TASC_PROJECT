package com.example.userservice.controller;

import com.example.userservice.dto.RecruitmentDto;
import com.example.userservice.service.RecruitmentService;
import com.example.userservice.util.HandleResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recruitment")
public class RecruitmentController {

    @Autowired
    private RecruitmentService recruitmentService;

    @PostMapping("/all")
    public ResponseEntity<HandleResponse<List<RecruitmentDto>>> getAllRecruitment(@Valid @RequestBody RecruitmentDto recruitmentDto) {
        return recruitmentService.getAllRecruitment(recruitmentDto);
    }

    @PostMapping("/create")
    public ResponseEntity<HandleResponse<RecruitmentDto>> createRecruitment(@Valid @RequestBody RecruitmentDto recruitmentDto) {
        return recruitmentService.createRecruitment(recruitmentDto);
    }

    @PostMapping("/delete")
    public ResponseEntity<HandleResponse> deleteRecruitmentByID(@Valid @RequestBody RecruitmentDto recruitmentDto) {
        return recruitmentService.deleteRecruitmentByID(recruitmentDto);
    }

    @PostMapping("/update")
    public ResponseEntity<HandleResponse> updateRecruitmentByID(@Valid @RequestBody RecruitmentDto recruitmentDto) {
        return recruitmentService.updateRecruitmentByID(recruitmentDto);
    }

    @PostMapping("/status")
    public ResponseEntity<HandleResponse> updateStatusRecruitmentByID(@Valid @RequestBody RecruitmentDto recruitmentDto) {
        return recruitmentService.updateStatusRecruitmentByID(recruitmentDto);
    }
}
