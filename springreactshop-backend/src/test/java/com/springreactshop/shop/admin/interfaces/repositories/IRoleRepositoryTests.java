package com.springreactshop.shop.admin.interfaces.repositories;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;
import java.util.List;

import com.springreactshop.shop.admin.interfaces.repositories.role.IRoleRepository;
import com.springreactshop.shop.common.entities.Role;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class IRoleRepositoryTests {
    @Autowired
    private IRoleRepository roleRepository;

    @Test
    public void createFirstRoleTest() {
        Role roleAdmin = new Role("Manager", "General management");
        Role savedAdminRole = roleRepository.save(roleAdmin);

        assertNotNull(savedAdminRole);
    }

    @Test
    public void createRestRolesTest() {
        Role roleSalesPerson = new Role("SalesPerson", "Can view products, prices etc.");
        Role roleEditor = new Role("Editor", "Can add/edit products");
        Role roleShipper = new Role("Shipper", "Can package and ship orders");
        Role roleAssistant = new Role("Assistant", "Can view orders and update order status");

        roleRepository.saveAll(List.of(roleSalesPerson, roleEditor, roleShipper, roleAssistant));
    }
}
