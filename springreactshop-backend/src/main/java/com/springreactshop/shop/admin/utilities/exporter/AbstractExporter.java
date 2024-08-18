package com.springreactshop.shop.admin.utilities.exporter;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import jakarta.servlet.http.HttpServletResponse;

public abstract class AbstractExporter {
        public void setResponseHeader(HttpServletResponse httpServletResponse, String contentType, String extension, String prefix) throws IOException{
        DateFormat dateFormatter = new SimpleDateFormat("dd-MM-yyyy_HH-mm-ss");
        String timestamp = dateFormatter.format(new Date());
        String fileName = prefix + timestamp + extension;

        httpServletResponse.setContentType(contentType);

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=" + fileName;
        httpServletResponse.setHeader(headerKey, headerValue);
    }
}
