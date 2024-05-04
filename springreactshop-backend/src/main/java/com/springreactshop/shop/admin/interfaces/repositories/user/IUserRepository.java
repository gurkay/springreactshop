package com.springreactshop.shop.admin.interfaces.repositories.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springreactshop.shop.common.entities.User;

public interface IUserRepository extends JpaRepository<User, Long>{
    
}
