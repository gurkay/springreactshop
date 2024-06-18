package com.springreactshop.shop.admin.utilities;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

public class FileUploadUtility {
    private static final Logger LOGGER = LoggerFactory.getLogger(FileUploadUtility.class);

    public static void saveFile(String uploadDir, String fileName, MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir);

        if(!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try(InputStream inputStream = file.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            
        } catch (IOException e) {
            LOGGER.error("Error occurred while uploading file: " + file);
            throw new IOException("Error occurred while uploading file: " + fileName, e);
        }
    }

    public static void deleteFile(String uploadDir) throws IOException {
        Path filePath = Paths.get(uploadDir);
        if(!Files.exists(filePath)) {
            return;
        }
        Files.list(filePath).forEach(file -> {
            if(!Files.isDirectory(file)){
                try {
                    Files.delete(file);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        Files.deleteIfExists(filePath);
    }

    public static boolean isFileExist(String uploadDir, String fileName) {
        Path filePath = Paths.get(uploadDir, fileName);
        return Files.exists(filePath);
    }
}
