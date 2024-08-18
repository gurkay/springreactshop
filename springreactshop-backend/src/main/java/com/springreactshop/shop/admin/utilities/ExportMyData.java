package com.springreactshop.shop.admin.utilities;

import java.util.List;

import com.springreactshop.shop.common.dtos.UserDtoWithoutPass;

import lombok.Getter;

@Getter
public class ExportMyData {
    private String fileName;
    private List<UserDtoWithoutPass> data;

    public ExportMyData(String fileName, List<UserDtoWithoutPass> data) {
        this.fileName = fileName;
        this.data = data;
    }
}
