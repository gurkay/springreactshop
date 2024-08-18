package com.springreactshop.shop.admin.interfaces.services.user;

import java.io.IOException;

import com.springreactshop.shop.admin.interfaces.services.IGenericService;
import com.springreactshop.shop.common.dtos.UserDto;

import jakarta.servlet.http.HttpServletResponse;

public interface IUserService<TEntityDto extends UserDto> extends IGenericService<TEntityDto> {
    public String exportUsersToCSV(HttpServletResponse response) throws IOException;
    public String exportUsersToExcel(HttpServletResponse response) throws IOException;
}
