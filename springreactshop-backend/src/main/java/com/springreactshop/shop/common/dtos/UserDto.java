package com.springreactshop.shop.common.dtos;

import java.util.List;
import java.util.Set;

import com.springreactshop.shop.common.entities.Role;
import com.springreactshop.shop.common.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {
    private Long id;

    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private String photos;

    private boolean enabled;

    private Set<Role> roles;

    public UserDto(
        Long id, 
        String email, 
        String password, 
        String firstName, 
        String lastName, 
        String photos,
        boolean enabled,
        Set<Role> roles) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.photos = photos;
        this.enabled = enabled;
        this.roles = roles;
    }
}
