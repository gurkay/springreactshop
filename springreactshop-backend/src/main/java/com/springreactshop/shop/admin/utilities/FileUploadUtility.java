package com.springreactshop.shop.admin.utilities;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;

public class FileUploadUtility {
    public static void saveFile(String uploadDir, String fileName, MultipartFile file) {
        Path uploadPath = Paths.get(uploadDir);
    }
}
