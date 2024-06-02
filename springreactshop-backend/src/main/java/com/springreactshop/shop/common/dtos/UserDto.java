package com.springreactshop.shop.common.dtos;

import java.util.Set;

import com.springreactshop.shop.common.entities.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;

    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private String photos;

    private boolean enabled;

    private Set<Role> roles;

    private String photosImagePath;
}
