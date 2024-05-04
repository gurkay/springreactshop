package com.springreactshop.shop.admin.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springreactshop.shop.admin.interfaces.repositories.role.IRoleRepository;
import com.springreactshop.shop.common.entities.Role;

@Service
public class RoleService {
    
    @Autowired
    private IRoleRepository roleRepository;

    public Role save(Role role) {
        return roleRepository.save(role);
    }
}
