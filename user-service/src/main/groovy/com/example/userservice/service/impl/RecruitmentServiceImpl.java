package com.example.userservice.service.impl;

import com.example.userservice.dto.CompanyDto;
import com.example.userservice.dto.RecruitmentDto;
import com.example.userservice.entity.CompanyEntity;
import com.example.userservice.entity.RecruitmentEntity;
import com.example.userservice.enums.RecruitmentStatus;
import com.example.userservice.repository.RecruitmentRepository;
import com.example.userservice.service.RecruitmentService;
import com.example.userservice.util.HandleResponse;
import com.example.userservice.util.ReflectionMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.sql.Timestamp;
import java.util.List;

import static com.example.userservice.config.Constant.*;

@Service
public class RecruitmentServiceImpl implements RecruitmentService {

    @Autowired
    private RecruitmentRepository recruitmentRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public ResponseEntity<HandleResponse<RecruitmentDto>> createRecruitment(RecruitmentDto recruitmentDto) {
        RecruitmentEntity companyExit = recruitmentRepository.findRecruitmentByTitle(recruitmentDto.getTitle());

        if (companyExit == null) {
            RecruitmentEntity recruitmentEntity = ReflectionMapper.map(recruitmentDto, RecruitmentEntity.class);
            recruitmentEntity.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            recruitmentEntity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            recruitmentRepository.save(recruitmentEntity);
            recruitmentDto.setRecruitmentID(recruitmentEntity.getRecruitmentID());
            return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), ADD_SUCCESS, recruitmentDto));
        } else {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), RECRUITMENT_EXIT));
        }
    }

    @Override
    public ResponseEntity<HandleResponse> deleteRecruitmentByID(RecruitmentDto recruitmentDto) {
        RecruitmentEntity recruitmentEntity = recruitmentRepository.findRecruitmentByID(recruitmentDto.getRecruitmentID());
        if (recruitmentDto != null) {
            recruitmentRepository.delete(recruitmentEntity);
            return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), DELETE_SUCCESS));
        }
        return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), DELETE_FAIL));
    }

    @Override
    public ResponseEntity<HandleResponse> updateRecruitmentByID(RecruitmentDto recruitmentDto) {
        RecruitmentEntity recruitmentEntity = recruitmentRepository.findRecruitmentByID(recruitmentDto.getRecruitmentID());
        if (recruitmentEntity == null) {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), RECRUITMENT_NOT_EXIT));
        }

        if (!recruitmentEntity.getTitle().equals(recruitmentDto.getTitle())) {
            RecruitmentEntity recruitmentTitle = recruitmentRepository.findRecruitmentByTitle(recruitmentDto.getTitle());
            if (recruitmentTitle != null) {
                return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), RECRUITMENT_EXIT));
            }
            recruitmentEntity.setTitle(recruitmentDto.getTitle());
        }

        recruitmentEntity = ReflectionMapper.map(recruitmentDto, RecruitmentEntity.class);
        recruitmentEntity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        recruitmentRepository.save(recruitmentEntity);
        return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), UPDATE_SUCCESS));
    }

    @Override
    public ResponseEntity<HandleResponse> updateStatusRecruitmentByID(RecruitmentDto recruitmentDto) {
        RecruitmentEntity recruitmentEntity = recruitmentRepository.findRecruitmentByID(recruitmentDto.getRecruitmentID());
        if (recruitmentEntity == null) {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), RECRUITMENT_NOT_EXIT));
        }

        recruitmentEntity.setStatus(recruitmentDto.getStatus());
        recruitmentEntity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        recruitmentRepository.save(recruitmentEntity);
        return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), UPDATE_SUCCESS));
    }

    @Override
    public ResponseEntity<HandleResponse<List<RecruitmentDto>>> getAllRecruitment(RecruitmentDto recruitmentDto) {
        String status = String.valueOf(recruitmentDto.getStatus());
        RecruitmentStatus recruitmentStatus = RecruitmentStatus.valueOf(status);

        StringBuilder sql = new StringBuilder("SELECT r FROM RecruitmentEntity r");

        if (status != null && !status.isEmpty()) {
            sql.append(" WHERE r.status = :status");
        }

        Query query = entityManager.createQuery(sql.toString(), RecruitmentEntity.class);

        if (status != null && !status.isEmpty()) {
            query.setParameter("status", recruitmentStatus);
        }

        List<RecruitmentEntity> listRecruitmentEntity = query.getResultList();
        List<RecruitmentDto> listRecruitmentDto = ReflectionMapper.mapList(listRecruitmentEntity, RecruitmentDto.class);
        return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), GET_SUCCESS, listRecruitmentDto));
    }
}
