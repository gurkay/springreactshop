package com.springreactshop.shop.admin.services;

import java.util.HashSet;
import java.util.Set;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springreactshop.shop.admin.interfaces.repositories.user.IUserRepository;
import com.springreactshop.shop.common.entities.Role;
import com.springreactshop.shop.common.entities.User;

@Service
public class UserService {
    
    @Autowired
    private IUserRepository userRepository;

    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();
        System.out.println("UserService:::getAllUsers:::" + users);
        return userRepository.findAll();
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
