package com.springreactshop.shop.admin.interfaces.services;

import java.util.List;

public interface IGenericService<TEntityDto> {
    TEntityDto create(TEntityDto employeeDto);
    TEntityDto getById(Long id);
    List<TEntityDto> getAll();
    TEntityDto update(Long id, TEntityDto employeeDto);
    void delete(Long id);
}
