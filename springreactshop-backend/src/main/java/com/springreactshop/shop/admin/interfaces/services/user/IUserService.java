package com.springreactshop.shop.admin.interfaces.services.user;

import java.io.IOException;

import com.springreactshop.shop.admin.interfaces.services.IGenericService;
import com.springreactshop.shop.common.dtos.UserDto;

public interface IUserService<TEntityDto extends UserDto> extends IGenericService<TEntityDto> {
    public String exportUsersToCSV() throws IOException;
    public String exportUsersToExcel() throws IOException;
    public String exportUsersToPDF() throws IOException;
}
