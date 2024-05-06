package com.springreactshop.shop.admin.services;

import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springreactshop.shop.admin.interfaces.repositories.role.IRoleRepository;
import com.springreactshop.shop.admin.interfaces.repositories.user.IUserRepository;
import com.springreactshop.shop.common.dtos.UserDto;
import com.springreactshop.shop.common.entities.Role;
import com.springreactshop.shop.common.entities.User;
import com.springreactshop.shop.common.mapper.UserMapper;

import lombok.extern.java.Log;

@Log
@Service
public class UserService {

    @Autowired
    private IUserRepository userRepository;

    public List<UserDto> getAllUsers() {
        log.info("UserService:::getAllUsers:::log");
        List<User> users = userRepository.findAll();

        List<UserDto> usersDtos = users.stream().map(user -> UserMapper.mapToUserDto(user)).collect(Collectors.toList());

        // List<UserDto> usersDtos = new ArrayList<>();
        // for (User user : users) {
        //     UserDto userDto = new UserDto(
        //             user.getId(),
        //             user.getEmail(),
        //             user.getPassword(),
        //             user.getFirstName(),
        //             user.getLastName(),
        //             user.getPhotos(),
        //             user.isEnabled());
        //     Set<Role> roleNames = new HashSet<>();
        //     for (Role role : user.getRoles()) {
        //         roleNames.add(role);
        //     }
        //     userDto.setRoles(roleNames);
        //     usersDtos.add(userDto);
        // }

        // List<UserDto> usersDto = users.stream().map(UserMapper::mapToUserDto).collect(Collectors.toList());
        // for (UserDto userDto : usersDto) {
        //     System.out.println(userDto);
        // }
        return usersDtos;
    }

    public User addUserRole(User user, Role role) {
        Set<Role> roles = user.getRoles();
        if (roles == null) {
            roles = new HashSet<>();
        }
        roles.add(role);
        user.setRoles(roles);

        return user;
    }
}
