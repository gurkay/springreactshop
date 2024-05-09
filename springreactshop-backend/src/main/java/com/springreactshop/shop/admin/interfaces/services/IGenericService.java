package com.springreactshop.shop.admin.interfaces.services;

import java.util.List;

public interface IGenericService<TEntityDto> {
    TEntityDto createUser(TEntityDto employeeDto);
    TEntityDto getUserById(Long id);
    List<TEntityDto> getAllUsers();
    TEntityDto updateUser(Long id, TEntityDto employeeDto);
    void deleteUser(Long id);
}
