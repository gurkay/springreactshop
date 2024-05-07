package com.springreactshop.shop.admin.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.springreactshop.shop.admin.interfaces.repositories.user.IUserRepository;
import com.springreactshop.shop.admin.interfaces.services.user.IUserService;
import com.springreactshop.shop.common.dtos.UserDto;
import com.springreactshop.shop.common.entities.User;
import com.springreactshop.shop.common.mapper.UserMapper;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDto> usersDtos = users.stream().map(user -> UserMapper.mapToUserDto(user)).collect(Collectors.toList());

        return usersDtos;
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id).get();
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public UserDto createUser(UserDto employeeDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createUser'");
    }

    @Override
    public UserDto updateUser(Long id, UserDto employeeDto) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
    }

    @Override
    public void deleteUser(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteUser'");
    }
}
