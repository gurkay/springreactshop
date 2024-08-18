package com.springreactshop.shop.common.mapper;

import com.springreactshop.shop.common.dtos.UserDto;
import com.springreactshop.shop.common.dtos.UserDtoWithoutPass;
import com.springreactshop.shop.common.entities.Role;
import com.springreactshop.shop.common.entities.User;

import java.util.Set;
import java.util.HashSet;

public class UserMapper {

    public static UserDto mapToUserDto(User user) {
        return new UserDto(
            user.getId(),
            user.getEmail(),
            user.getPassword(),
            user.getFirstName(),
            user.getLastName(),
            user.getPhotos(),
            user.isEnabled(),
            user.getRoles(),
            user.getPhotosImagePath()
        );
    }

    public static User mapToUser(UserDto userDto) {
        Set<Role> rolesSet = new HashSet<>(userDto.getRoles());
        User user = new User();
        user.setId(userDto.getId());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPhotos(userDto.getPhotos());
        user.setEnabled(userDto.isEnabled());
        user.setRoles(rolesSet);
        return user;
    }

    public static UserDtoWithoutPass mapToUserDtoWithoutPass(User user) {
        return new UserDtoWithoutPass(
            user.getId(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getPhotos(),
            user.isEnabled(),
            user.getRoles(),
            user.getPhotosImagePath()
        );
    }
}
