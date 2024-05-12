package com.springreactshop.shop.admin.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springreactshop.shop.admin.interfaces.repositories.role.IRoleRepository;
import com.springreactshop.shop.admin.interfaces.repositories.user.IUserRepository;
import com.springreactshop.shop.admin.interfaces.services.user.IUserService;
import com.springreactshop.shop.common.dtos.RoleDto;
import com.springreactshop.shop.common.dtos.UserDto;
import com.springreactshop.shop.common.entities.User;
import com.springreactshop.shop.common.exception.ResourceNotFoundException;
import com.springreactshop.shop.common.mapper.RoleMapper;
import com.springreactshop.shop.common.mapper.UserMapper;

@Service
public class UserServiceImpl implements IUserService<UserDto> {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Override
    public List<UserDto> getAll() {
        List<User> users = userRepository.findAll();
        List<UserDto> usersDtos = users.stream().map(user -> UserMapper.mapToUserDto(user)).collect(Collectors.toList());

        return usersDtos;
    }

    @Override
    public UserDto getById(Long id) {
        User user = userRepository
                    .findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found for id: " + id));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public UserDto create(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto update(Long id, UserDto userDto) {
        User user = userRepository
                    .findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found for id: " + id));
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setPhotos(userDto.getPhotos());
        user.setEnabled(userDto.isEnabled());
        user.setRoles(userDto.getRoles());
        User updatedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(updatedUser);
    }

    @Override
    public void delete(Long id) {
        User user = userRepository
                    .findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found for id: " + id));
        userRepository.delete(user);
    }
}
