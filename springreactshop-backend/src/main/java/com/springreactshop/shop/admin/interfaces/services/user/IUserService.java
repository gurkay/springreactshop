package com.springreactshop.shop.admin.interfaces.services.user;

import com.springreactshop.shop.admin.interfaces.services.IGenericService;
import com.springreactshop.shop.common.dtos.UserDto;

public interface IUserService<TEntityDto extends UserDto> extends IGenericService<TEntityDto> {

}
