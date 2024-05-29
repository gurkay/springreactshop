package com.springreactshop.shop.admin.interfaces.repositories.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springreactshop.shop.common.entities.User;


public interface IUserRepository extends JpaRepository<User, Long>{

    @Query("SELECT u FROM User u WHERE u.email = :email")
    public User isEmailUnique(@Param(value = "email") String email);

    public User findByEmail(String email);

    @Query("UPDATE User u SET u.enabled = :enabled WHERE u.id = :id")
    @Modifying
    public void updateUserEnabledStatus(Long id, boolean enabled);

}
