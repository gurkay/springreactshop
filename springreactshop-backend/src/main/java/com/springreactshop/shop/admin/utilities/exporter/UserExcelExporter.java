package com.springreactshop.shop.admin.utilities.exporter;
import java.io.IOException;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springreactshop.shop.common.dtos.UserDtoWithoutPass;

public class UserExcelExporter extends AbstractExporter {

    public String export(List<UserDtoWithoutPass> listUsers) throws IOException {
        
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(listUsers);
        
        return jsonString;
    }


}
