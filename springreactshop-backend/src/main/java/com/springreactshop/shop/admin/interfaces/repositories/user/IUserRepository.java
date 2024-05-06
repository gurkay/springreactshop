package com.springreactshop.shop.admin.interfaces.repositories.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springreactshop.shop.common.entities.Role;
import com.springreactshop.shop.common.entities.User;

public interface IUserRepository extends JpaRepository<User, Long>{
    public User findByEmail(String email);

    // @Query("SELECT springreactshop.roles.id, springreactshop.roles.name, springreactshop.roles.description FROM springreactshop.users_roles\n" + //
    //             "JOIN springreactshop.users ON springreactshop.users.id = springreactshop.users_roles.user_id \n" + //
    //             "JOIN springreactshop.roles ON springreactshop.roles.id = springreactshop.users_roles.role_id\n" + //
    //             "WHERE user_id = ?1;")
    // public List<Role> getUserRoles(long id);
}
