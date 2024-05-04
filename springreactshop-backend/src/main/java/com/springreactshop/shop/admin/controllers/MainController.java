package com.springreactshop.shop.admin.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/admin")
public class MainController {

    @GetMapping("/home")
    public String viewHomePage() {
        return "home";
    }
}
