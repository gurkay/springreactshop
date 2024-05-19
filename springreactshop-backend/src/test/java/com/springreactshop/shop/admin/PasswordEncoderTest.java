package com.springreactshop.shop.admin;


import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderTest {
    
    @Test
    public void testPasswordEncoding() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode("gurkay");
        boolean result = passwordEncoder.matches("gurkay", encodedPassword);
        
        assertTrue(result);

        System.out.println(encodedPassword);
    }
}
