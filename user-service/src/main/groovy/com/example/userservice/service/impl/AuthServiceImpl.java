package com.example.userservice.service.impl;

import com.example.userservice.config.JwtConfig;
import com.example.userservice.dto.CompanyDto;
import com.example.userservice.dto.UserDto;
import com.example.userservice.entity.CompanyEntity;
import com.example.userservice.entity.UserEntity;
import com.example.userservice.enums.SystemRole;
import com.example.userservice.repository.CompanyRepository;
import com.example.userservice.repository.UserRepository;
import com.example.userservice.service.AuthService;
import com.example.userservice.util.HandleResponse;
import com.example.userservice.util.HashPassword;
import com.example.userservice.util.ReflectionMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

import static com.example.userservice.config.Constant.*;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JwtConfig jwtConfig;

    @Override
    public ResponseEntity<HandleResponse> login(UserDto userDto) {
        UserEntity userEntity = userRepository.findUserByEmail(userDto.getEmail());

        if (userEntity != null && StringUtils.isNotEmpty(userEntity.getPassword())
                && HashPassword.matchesPassword(userDto.getPassword(), userEntity.getPassword())) {
            String token = jwtConfig.generateJwtToken(
                    userEntity.getUserID(), userEntity.getEmail(), userEntity.getRole()
            );
            String refreshToken = jwtConfig.generateRefreshToken(userEntity.getUserID());
            return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), LOGIN_SUCCESS, token, refreshToken, userEntity));
        }

        return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), LOGIN_FAIL));
    }

    @Override
    public ResponseEntity<HandleResponse<UserDto>> signupCandidate(UserDto userDto) {
        UserEntity userExit = userRepository.findUserByEmail(userDto.getEmail());

        if (userExit == null) {
            UserEntity newUser = new UserEntity();
            newUser.setEmail(userDto.getEmail());
            newUser.setPassword(HashPassword.encodePassword(userDto.getPassword()));
            newUser.setRole(String.valueOf(SystemRole.ROLE_CANDIDATE));
            newUser.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            newUser.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            newUser.setCreatedBy(newUser.getUserID());
            userRepository.save(newUser);
            userDto.setUserID(newUser.getUserID());
            return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), SING_UP_SUCCESS, userDto));
        } else {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), ACCOUNT_EXIT));
        }
    }

    @Override
    public ResponseEntity<HandleResponse<UserDto>> signupEmployer(UserDto userDto) {
        if (userRepository.findUserByEmail(userDto.getEmail()) != null) {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), ACCOUNT_EXIT));
        }

        String companyId = userDto.getCompanyID();
        if (StringUtils.isEmpty(userDto.getCompanyID())) {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), COMPANY_REQUIRE));
        }

        if (companyRepository.findCompanyByID(companyId) == null) {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), COMPANY_NOT_EXIT));
        }

        UserEntity newUser = new UserEntity();
        newUser.setCompanyID(companyId);
        newUser.setEmail(userDto.getEmail());
        newUser.setPassword(HashPassword.encodePassword(userDto.getPassword()));
        newUser.setRole(String.valueOf(SystemRole.ROLE_EMPLOYER));
        newUser.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        newUser.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        newUser.setCreatedBy(newUser.getUserID());
        userRepository.save(newUser);
        userDto.setUserID(newUser.getUserID());
        return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), SING_UP_SUCCESS, userDto));
    }

    @Override
    public ResponseEntity<HandleResponse<CompanyDto>> createCompany(CompanyDto companyDto) {
        CompanyEntity companyExit = companyRepository.findCompanyByCorporateTaxCode(companyDto.getCorporateTaxCode());

        if (companyExit == null) {
            CompanyEntity companyEntity = ReflectionMapper.map(companyDto, CompanyEntity.class);
            companyEntity.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            companyEntity.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            companyEntity.setCreatedBy(companyEntity.getCompanyID());
            companyRepository.save(companyEntity);
            companyDto.setCompanyID(companyEntity.getCompanyID());
            return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), ADD_SUCCESS, companyDto));
        } else {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), CORPORATE_TAX_CODE_EXIT));
        }
    }
}
