package com.springreactshop.shop.admin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springreactshop.shop.admin.services.RoleServiceImpl;
import com.springreactshop.shop.common.dtos.RoleDto;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/admin")
public class RoleController {

    @Autowired
    private RoleServiceImpl roleService;

    @GetMapping("/roles")
    public List<RoleDto> getAllRoles() {
        return roleService.getAll();
    }
}
