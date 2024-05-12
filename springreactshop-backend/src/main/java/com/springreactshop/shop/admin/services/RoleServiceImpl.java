package com.springreactshop.shop.admin.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springreactshop.shop.admin.interfaces.repositories.role.IRoleRepository;
import com.springreactshop.shop.admin.interfaces.services.role.IRoleService;
import com.springreactshop.shop.common.dtos.RoleDto;
import com.springreactshop.shop.common.mapper.RoleMapper;

@Service
public class RoleServiceImpl implements IRoleService<RoleDto> {
    
    @Autowired
    private IRoleRepository roleRepository;

    @Override
    public RoleDto create(RoleDto employeeDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public RoleDto getById(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getById'");
    }

    @Override
    public List<RoleDto> getAll() {
        List<RoleDto> roles = roleRepository.findAll().stream().map(role -> RoleMapper.mapToRoleDto(role)).collect(Collectors.toList());
        return roles;
    }

    @Override
    public RoleDto update(Long id, RoleDto employeeDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

}
