package com.springreactshop.shop.admin.utilities;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import com.springreactshop.shop.common.entities.User;

import jakarta.servlet.http.HttpServletResponse;  

public class UserCsvExporter {

    public void export(List<User> users, HttpServletResponse response) throws IOException {
        DateFormat dateFormatter = new SimpleDateFormat("dd-MM-yyyy_HH-mm-ss");
        String timestamp = dateFormatter.format(new Date());
        String fileName = "users_" + timestamp + ".csv";

        response.setContentType("text/csv");

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=" + fileName;

        response.setHeader(headerKey, headerValue);

        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);

        String[] csvHeader = { "User ID", "Email", "First Name", "Last Name", "Roles", "Enabled" };
        String[] fieldMapping = { "id", "email", "firstName", "lastName", "roles", "enabled" };

        csvWriter.writeHeader(csvHeader);
        for (User user : users) {
            csvWriter.write( user, fieldMapping);
        }
        csvWriter.close();
    }
    
}
