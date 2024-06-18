package com.springreactshop.shop.admin.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springreactshop.shop.admin.services.UserServiceImpl;
import com.springreactshop.shop.admin.utilities.FileUploadUtility;
import com.springreactshop.shop.common.dtos.UserDto;
import com.springreactshop.shop.common.dtos.UserResponseDto;
import com.springreactshop.shop.common.exception.UserNotFoundException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;



@CrossOrigin
@RestController
@RequestMapping("/api/v1/admin")
public class UserController {
    
    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/users")
    public ResponseEntity<UserResponseDto> getAllUsers() {
        return listByPage(1);
    }

    @GetMapping("/users/page/{pageNum}")
    public ResponseEntity<UserResponseDto> listByPage(@PathVariable("pageNum") int pageNum) {
        Page<UserDto> users = userService.listByPage(pageNum);
        List<UserDto> usersDtos = users.getContent();
        long startCount = (pageNum - 1) * UserServiceImpl.DEFAULT_PAGE_SIZE + 1;
        long endCount = Math.min(pageNum * UserServiceImpl.DEFAULT_PAGE_SIZE, users.getTotalElements());
        UserResponseDto response = new UserResponseDto(
                                        usersDtos, 
                                        pageNum, 
                                        users.getTotalElements(), 
                                        users.getTotalPages(),
                                        startCount,
                                        endCount,
                                        pageNum);
        response.setMessage(pageNum + " page of users");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") Long userId) {
        return ResponseEntity.ok(userService.getById(userId));
    }

    @PostMapping("/user")
    public ResponseEntity<UserResponseDto> createUser(@RequestParam("userDto") String userDtoJson, @RequestParam("file") MultipartFile file) throws IOException {
        UserDto userDto = new ObjectMapper().readValue(userDtoJson, UserDto.class);
        UserDto savedUser = null;
        if (!file.isEmpty()) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            userDto.setPhotos(fileName);
            savedUser = userService.create(userDto);
            String uploadDir = "springreactshop-frontend/public/images/user-photos" + "/" + savedUser.getId();
            FileUploadUtility.saveFile(uploadDir, fileName, file);
        } else {
            if(userDto.getPhotos().isEmpty()) userDto.setPhotos(null);
            savedUser = userService.create(userDto);
        }

        return ResponseEntity.ok(new UserResponseDto(savedUser, "User created successfully"));
    }

    @PostMapping("/userNoUserPhotos")
    public ResponseEntity<UserResponseDto> createUserNoUserPhotos(@RequestParam("userDto") String userDtoJson) throws IOException {
        UserDto userDto = new ObjectMapper().readValue(userDtoJson, UserDto.class);
        UserDto savedUser = null;
        if(userDto.getPhotos().isEmpty()) userDto.setPhotos(null);
        savedUser = userService.create(userDto);

        return ResponseEntity.ok(new UserResponseDto(savedUser, "User created successfully"));
    }
       
    @PutMapping("/user/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable("id") Long userId, @RequestParam("userDto") String userDtoJson, @RequestParam("file") MultipartFile file) throws UserNotFoundException, IOException {
        UserDto userDto = new ObjectMapper().readValue(userDtoJson, UserDto.class);
        UserDto updateUser = null;
        if (!file.isEmpty()) {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            userDto.setPhotos(fileName);
            updateUser = userService.update(userId, userDto);
            String uploadDir = "springreactshop-frontend/public/images/user-photos" + "/" + userId;

            if(FileUploadUtility.isFileExist(uploadDir, fileName)) {
                FileUploadUtility.deleteFile(uploadDir);
            }
            FileUploadUtility.saveFile(uploadDir, fileName, file);
        } else {
            updateUser = userService.update(userId, userDto);
        }
        return ResponseEntity.ok(new UserResponseDto(updateUser, "User update successfully"));
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
