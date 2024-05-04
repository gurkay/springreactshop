package com.springreactshop.shop.admin.interfaces.repositories.role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springreactshop.shop.common.entities.Role;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {
    
}
