package com.example.paymentservice.controller;

import com.example.paymentservice.dto.EmailDto;
import com.example.paymentservice.service.EmailService;
import com.example.paymentservice.util.HandleResponse;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.paymentservice.config.Constant.SEND_EMAIL_FAIL;
import static com.example.paymentservice.config.Constant.SEND_EMAIL_SUCCESS;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<HandleResponse> sendEmail(@RequestBody EmailDto emailDto) throws MessagingException {
        try {
            emailService.sendHtmlEmail(emailDto);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), SEND_EMAIL_FAIL));
        }
        return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.OK.value(), SEND_EMAIL_SUCCESS));
    }
}
