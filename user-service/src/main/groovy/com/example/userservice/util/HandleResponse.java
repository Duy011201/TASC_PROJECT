package com.example.userservice.util;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HandleResponse <T> {

    private int status;
    private String message;
    private String token;
    private String refreshToken;
    private UUID id;
    private T data;

    public HandleResponse(int status, String message) {
        super();
        this.status = status;
        this.message = message;
    }

    public HandleResponse(int status, String message, T data) {
        super();
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public HandleResponse(int status, String message, String token) {
        super();
        this.status = status;
        this.message = message;
        this.token = token;
    }

    public HandleResponse(int status, String message, String token, String refreshToken) {
        super();
        this.status = status;
        this.message = message;
        this.token = token;
        this.refreshToken = refreshToken;
    }

    public HandleResponse(int status, String message, String token, String refreshToken, T data) {
        this.status = status;
        this.message = message;
        this.token = token;
        this.refreshToken = refreshToken;
        this.data = data;
    }
}
