package com.springreactshop.shop.admin.utilities;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springreactshop.shop.common.dtos.UserDtoWithoutPass;

import jakarta.servlet.http.HttpServletResponse;

public class UserCsvExporter {

    public String export(List<UserDtoWithoutPass> users, HttpServletResponse response) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(users);
        return jsonString;
    }
    
}
