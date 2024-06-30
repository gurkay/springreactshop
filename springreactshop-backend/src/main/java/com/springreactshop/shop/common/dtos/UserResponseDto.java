package com.springreactshop.shop.common.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private UserDto userDto = new UserDto();
    private String message = "";
    private List<UserDto> users = null;
    private int pageNum = 0;
    private long totalElements = 0;
    private int totalPages = 0;
    private long startCount = 0;
    private long endCount = 0;
    private long currentPage = 0;
    private String sortField = "";
    private String sortDir = "";
    private String keyword = "";

    public UserResponseDto(UserDto userDto, String message) {
        this.userDto = userDto;
        this.message = message;
    }

    public UserResponseDto(
        List<UserDto> users, 
        int pageNum, 
        long totalElements, 
        int totalPages, 
        long startCount, 
        long endCount, 
        long currentPage,
        String sortField,
        String sortDir,
        String keyword) {
        this.users = users;
        this.pageNum = pageNum;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.startCount = startCount;
        this.endCount = endCount;
        this.currentPage = currentPage;
        this.sortField = sortField;
        this.sortDir = sortDir;
        this.keyword = keyword;
    }
}
