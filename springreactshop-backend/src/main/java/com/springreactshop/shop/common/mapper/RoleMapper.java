package com.springreactshop.shop.common.mapper;

import com.springreactshop.shop.common.dtos.RoleDto;
import com.springreactshop.shop.common.entities.Role;

public class RoleMapper {
    public static RoleDto mapToRoleDto(Role role) {
        return new RoleDto(
            role.getId(),
            role.getName(),
            role.getDescription()
        );
    }

    public static Role mapToRole(RoleDto roleDto) {
        Role role = new Role();
        role.setId(roleDto.getId());
        role.setName(roleDto.getName());
        role.setDescription(roleDto.getDescription());
        return role;
    }
}
