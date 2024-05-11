package com.springreactshop.shop.admin.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springreactshop.shop.admin.interfaces.repositories.role.IRoleRepository;
import com.springreactshop.shop.admin.interfaces.services.role.IRoleService;
import com.springreactshop.shop.common.dtos.RoleDto;

@Service
public class RoleServiceImpl implements IRoleService<RoleDto> {
    
    @Autowired
    private IRoleRepository roleRepository;

    @Override
    public RoleDto createUser(RoleDto employeeDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createUser'");
    }

    @Override
    public RoleDto getUserById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUserById'");
    }

    @Override
    public List<RoleDto> getAllUsers() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllUsers'");
    }

    @Override
    public RoleDto updateUser(Long id, RoleDto employeeDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
    }

    @Override
    public void deleteUser(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteUser'");
    }


}
