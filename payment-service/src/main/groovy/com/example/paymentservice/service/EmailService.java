package com.example.paymentservice.service;

import com.example.paymentservice.dto.EmailDto;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

@Service
public interface EmailService {
    public void sendHtmlEmail(EmailDto emailDto) throws MessagingException;
}
