package com.springreactshop.shop.admin.interfaces.services;

import java.util.List;

import com.springreactshop.shop.common.exception.UserNotFoundException;

public interface IGenericService<TEntityDto> {
    TEntityDto create(TEntityDto employeeDto);
    TEntityDto getById(Long id);
    List<TEntityDto> getAll();
    TEntityDto update(Long id, TEntityDto employeeDto) throws UserNotFoundException;
    void delete(Long id) throws UserNotFoundException;
}
