package com.springreactshop.shop.admin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springreactshop.shop.admin.services.UserServiceImpl;
import com.springreactshop.shop.common.dtos.UserDto;
import com.springreactshop.shop.common.exception.UserNotFoundException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/admin")
public class UserController {
    
    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/users")
    public List<UserDto> getAllUsers() {
        return userService.getAll();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long userId) {
        return ResponseEntity.ok(userService.getById(userId));
    }

    @PostMapping("/user")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto savedUser = userService.create(userDto);
        return ResponseEntity.ok(savedUser);
    }
    
    @PutMapping("/user/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long userId, @RequestBody UserDto userDto) throws UserNotFoundException {
        UserDto updatedUser = userService.update(userId, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId) throws UserNotFoundException {
        userService.delete(userId);
        return ResponseEntity.ok("User id: "+ userId +" deleted successfully!");
    }

    @PostMapping("/user/isEmailUnique/{email}")
    public boolean isEmailUnique(@PathVariable("email") String email) {
        return userService.isEmailUnique(email);
    }

    @GetMapping("/user/{id}/enabled/{status}")
    public ResponseEntity<String> updateUserEnabledStatus(@PathVariable("id") Long userId, @PathVariable("status") boolean enabled) {
        userService.updateUserEnabledStatus(userId, enabled);
        return ResponseEntity.ok("User id: " + userId + " status updated " + enabled);
    }
}
