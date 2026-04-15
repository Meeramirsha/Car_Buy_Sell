package com.example.carbackend.security;

import lombok.Data;

@Data
public class RegisterRequest {
    private String name;
    private String email;
    private String password;
    private String role; // Optional, usually defaults to "USER"
}
