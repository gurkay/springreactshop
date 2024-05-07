package com.springreactshop.shop.admin.interfaces.services.user;

import java.util.List;

import com.springreactshop.shop.common.dtos.UserDto;

public interface IUserService {
    UserDto createUser(UserDto employeeDto);
    UserDto getUserById(Long id);
    List<UserDto> getAllUsers();
    UserDto updateUser(Long id, UserDto employeeDto);
    void deleteUser(Long id);
}
