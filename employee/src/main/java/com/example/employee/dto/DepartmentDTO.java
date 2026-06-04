package com.example.employee.dto;

import jakarta.validation.constraints.NotBlank;

public class DepartmentDTO {

    private Long id;

    @NotBlank(message = "Department name is required")
    private String departmentName;

    // getters & setters
}