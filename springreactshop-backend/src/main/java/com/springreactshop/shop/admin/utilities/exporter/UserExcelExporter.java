package com.springreactshop.shop.admin.utilities.exporter;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springreactshop.shop.admin.utilities.ExportMyData;
import com.springreactshop.shop.common.dtos.UserDtoWithoutPass;
import com.springreactshop.shop.common.entities.User;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

public class UserExcelExporter extends AbstractExporter {
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;

    public UserExcelExporter() {
        workbook = new XSSFWorkbook();
    }

    private void writeHeaderLine() {
        sheet = workbook.createSheet("Users");
        XSSFRow row = sheet.createRow(0);

        XSSFCellStyle cellStyle = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        cellStyle.setFont(font);

        createCell(row, 0, "User Id", cellStyle);
        createCell(row, 1, "E-Mail", cellStyle);
        createCell(row, 2, "First Name", cellStyle);
        createCell(row, 3, "Last Name", cellStyle);
        createCell(row, 4, "Roles", cellStyle);
        createCell(row, 5, "Enabled", cellStyle);

    }

    private void createCell(XSSFRow row, int columnIndex, Object object, CellStyle cellStyle) {
        XSSFCell cell = row.createCell(columnIndex);
        sheet.autoSizeColumn(columnIndex);
        if (object instanceof Integer) {
            cell.setCellValue((Integer) object);
        } else if (object instanceof Long) {
            cell.setCellValue((Long) object);
        } else if (object instanceof Boolean) {
            cell.setCellValue((Boolean) object);
        } else {
            cell.setCellValue((String) object);
        }

        cell.setCellStyle(cellStyle);
    }

    private void writeDataLines(List<UserDtoWithoutPass> listUsers){
        int rowIndex = 1;

        XSSFCellStyle cellStyle = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        cellStyle.setFont(font);

        for (UserDtoWithoutPass user : listUsers) {
            XSSFRow row = sheet.createRow(rowIndex++);
            int columnIndex = 0;
            createCell(row, columnIndex++, user.getId(), cellStyle);
            createCell(row, columnIndex++, user.getEmail(), cellStyle);
            createCell(row, columnIndex++, user.getFirstName(), cellStyle);
            createCell(row, columnIndex++, user.getLastName(), cellStyle);
            createCell(row, columnIndex++, user.getRoles().toString(), cellStyle);
            createCell(row, columnIndex++, user.isEnabled(), cellStyle);
        }
    }

    public void export2(List<UserDtoWithoutPass> listUsers, HttpServletResponse httpServletResponse) throws IOException {
        super.setResponseHeader(httpServletResponse, "application/octet-stream", ".xlsx", "users_");

        writeHeaderLine();
        writeDataLines(listUsers);

        ServletOutputStream outputStream = httpServletResponse.getOutputStream();
        workbook.write(outputStream);

        workbook.close();
        outputStream.close();
    }

    public String export(List<UserDtoWithoutPass> listUsers, HttpServletResponse httpServletResponse) throws IOException {
        super.setResponseHeader(httpServletResponse, "application/octet-stream", ".xlsx", "users_");

        // writeHeaderLine();
        // writeDataLines(listUsers);

        // ServletOutputStream outputStream = httpServletResponse.getOutputStream();
        // workbook.write(outputStream);

        // workbook.close();
        // outputStream.close();

        DateFormat dateFormatter = new SimpleDateFormat("dd-MM-yyyy_HH-mm-ss");
        String timestamp = dateFormatter.format(new Date());
        String fileName = "users_" + timestamp + ".xlsx";
        
        ExportMyData myData = new ExportMyData(fileName, listUsers);
        
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(listUsers);
        
        return jsonString;
    }


}
