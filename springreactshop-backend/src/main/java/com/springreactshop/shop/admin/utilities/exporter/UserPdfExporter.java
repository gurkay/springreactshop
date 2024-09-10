package com.springreactshop.shop.admin.utilities.exporter;

import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springreactshop.shop.common.dtos.UserDtoWithoutPass;

public class UserPdfExporter {
    
    public String export(List<UserDtoWithoutPass> users) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(users);
        return jsonString;
    }
}
