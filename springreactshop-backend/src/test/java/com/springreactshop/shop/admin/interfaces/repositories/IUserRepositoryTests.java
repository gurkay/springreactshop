package com.springreactshop.shop.admin.interfaces.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.Rollback;

import com.springreactshop.shop.admin.interfaces.repositories.role.IRoleRepository;
import com.springreactshop.shop.admin.interfaces.repositories.user.IUserRepository;
import com.springreactshop.shop.common.entities.Role;
import com.springreactshop.shop.common.entities.User;

@DataJpaTest(showSql = false)
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class IUserRepositoryTests {
    
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void createUserTest() {
        Role roleAdmin = roleRepository.findById(Long.valueOf(1)).get();
        User userGurkay1 = new User("gurkay1@gmail.com", "gurkay1", "gurkay1", "basyigit1");
        userGurkay1.setRoles(Set.of(roleAdmin));

        User savedUser = userRepository.save(userGurkay1);

        assertEquals(savedUser.getId() > 0, true);
    }

    @Test
    public void createTwoUserTest() {
        User userGurkay2 = new User("gurkay2@gmail.com", "gurkay2", "gurkay2", "basyigit2");
        Role editor = roleRepository.findById(Long.valueOf(3)).get();
        Role assistant = roleRepository.findById(Long.valueOf(5)).get();

        userGurkay2.setRoles(Set.of(editor, assistant));

        User savedUser = userRepository.save(userGurkay2);

        assertEquals(savedUser.getId() > 0, true);
    }

    @Test
    public void findUserByEmailTest() {
        User user = userRepository.findByEmail("gurkay1@gmail.com");
        assertEquals(user.getEmail(), "gurkay1@gmail.com");
    }

    @Test
    public void listAllUsersTest() {
        Iterable<User> users = userRepository.findAll();

        for(User user : users) {
            System.out.println(user);
        }

        assertEquals(users.iterator().hasNext(), true);
    }

    @Test
    public void getUserByIdTest() {
        User user = userRepository.findById(Long.valueOf(2)).get();
        System.out.println(user);
        assertEquals(user.getId(), Long.valueOf(2));
    }

    @Test
    public void updateUserTest() {
        User user = userRepository.findById(Long.valueOf(2)).get();
        user.setEnabled(true);
        User savedUser = userRepository.save(user);
        System.out.println(savedUser);
        assertEquals(user.isEnabled(), savedUser.isEnabled());
    }

    @Test 
    public void updateUserRolesTest() {
        User user = userRepository.findById(Long.valueOf(3)).get();
        Role roleSalesPerson = new Role(Long.valueOf(2));
        Role roleEditor = new Role(Long.valueOf(3));
        Role roleShipper = roleRepository.findById(Long.valueOf(4)).get();
        Role roleAssistant = new Role(Long.valueOf(5));
        System.out.println("user first status: " + user);

        //user.getRoles().remove(roleSalesPerson);
        user.addRole(roleShipper);
        //user.addRole(roleAssistant);
        System.out.println(user);
        User savedUser = userRepository.save(user);
        // System.out.println("savedUser: " + savedUser);

        assertEquals(savedUser.getRoles().contains(roleShipper), true);
    }

    @Test
    public void deleteUserTest() {
        User user = userRepository.findById(Long.valueOf(2)).get();
        userRepository.deleteById(user.getId());
    }

    @Test
    public void testDisableUser() {
        Long userId = Long.valueOf(34);
        userRepository.updateUserEnabledStatus(userId, false);  
    }

    @Test
    public void testEnabledUser() {
        Long userId = Long.valueOf(34);
        userRepository.updateUserEnabledStatus(userId, true);
    }

    @Test
    public void testListFirstPage() {
        int pageNumber = 0;
        int pageSize = 5;

        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<User> users = userRepository.findAll(pageable);

        List<User> userList = users.toList();

        assertEquals(userList.size(), pageSize);
    }
}
