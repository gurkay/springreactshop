package com.springreactshop.shop.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.springreactshop.shop.admin.controllers.MainController;

@SpringBootTest
public class MainControllerTest {
    @Autowired
    private MainController controller;

    @Test
    public void testViewHomePage() throws Exception {
        String home = controller.viewHomePage();

        assertEquals("home", home);
    }

}
