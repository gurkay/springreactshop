package com.springreactshop.shop.admin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springreactshop.shop.admin.services.UserService;
import com.springreactshop.shop.common.dtos.UserDto;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/admin")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }
}
