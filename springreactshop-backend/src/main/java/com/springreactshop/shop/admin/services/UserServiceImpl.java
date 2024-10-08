package com.springreactshop.shop.admin.services;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.springreactshop.shop.admin.interfaces.repositories.user.IUserRepository;
import com.springreactshop.shop.admin.interfaces.services.user.IUserService;
import com.springreactshop.shop.admin.utilities.UserCsvExporter;
import com.springreactshop.shop.admin.utilities.exporter.UserExcelExporter;
import com.springreactshop.shop.admin.utilities.exporter.UserPdfExporter;
import com.springreactshop.shop.common.dtos.UserDto;
import com.springreactshop.shop.common.dtos.UserDtoWithoutPass;
import com.springreactshop.shop.common.entities.User;
import com.springreactshop.shop.common.exception.ResourceNotFoundException;
import com.springreactshop.shop.common.exception.UserNotFoundException;
import com.springreactshop.shop.common.mapper.UserMapper;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements IUserService<UserDto> {
    public static final int DEFAULT_PAGE_SIZE = 4;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> getAll() {
        List<User> users = userRepository.findAll();
        List<UserDto> usersDtos = users.stream().map(user -> UserMapper.mapToUserDto(user)).collect(Collectors.toList());

        return usersDtos;
    }

    public Page<UserDto> listByPage(int pageNum, String sortField, String sortDir, String keyword) {
        Sort sort = Sort.by(sortField);
        sort = sortDir.equals("asc") ? sort.ascending() : sort.descending();
        Pageable pageable = PageRequest.of(pageNum - 1, DEFAULT_PAGE_SIZE, sort);

        if(keyword != null) {
            Page<User> users = userRepository.findAll(keyword, pageable);
            Page<UserDto> usersDtos = users.map(user -> UserMapper.mapToUserDto(user));
    
            return usersDtos;
        }

        Page<User> users = userRepository.findAll(pageable);
        Page<UserDto> usersDtos = users.map(user -> UserMapper.mapToUserDto(user));

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
        encodePassword(user); // crypto user password
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public UserDto update(Long id, UserDto userDto) throws UserNotFoundException {
        User user = userRepository
                    .findById(id)
                    .orElseThrow(() -> new UserNotFoundException("User not found for id: " + id));
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
    public void delete(Long id) throws UserNotFoundException {
        User user = userRepository
                    .findById(id)
                    .orElseThrow(() -> new UserNotFoundException("User not found for id: " + id));
        userRepository.delete(user);
    }

    private void encodePassword(User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
    }

    public boolean isEmailUnique(String email) {
        User user = userRepository.isEmailUnique(email);
        return user == null ? false : true;
    }

    public void updateUserEnabledStatus(Long userId, boolean enabled) {
        userRepository.updateUserEnabledStatus(userId, enabled);
    }

    @Override
    public String exportUsersToCSV() throws IOException {
        List<User> users = userRepository.findAll();
        List<UserDtoWithoutPass> usersWithoutPass = users.stream()
            .map(UserMapper::mapToUserDtoWithoutPass)
            .collect(Collectors.toList());
        UserCsvExporter exporter = new UserCsvExporter();
        return exporter.export(usersWithoutPass);
    }

    @Override
    public String exportUsersToExcel() throws IOException {
        List<User> users = userRepository.findAll();
        List<UserDtoWithoutPass> usersWithoutPass = users.stream()
                                                        .map(UserMapper::mapToUserDtoWithoutPass)
                                                        .collect(Collectors.toList());
        UserExcelExporter exporter = new UserExcelExporter();
        return exporter.export(usersWithoutPass);
    }

    @Override
    public String exportUsersToPDF() throws IOException {
        List<User> users = userRepository.findAll();
        List<UserDtoWithoutPass> usersWithoutPass = users.stream()
            .map(UserMapper::mapToUserDtoWithoutPass)
            .collect(Collectors.toList());
        UserPdfExporter exporter = new UserPdfExporter();
        return exporter.export(usersWithoutPass);
    }
}
