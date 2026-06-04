package com.example.employee.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class EmployeeRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Enter valid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Department is required")
    private String department;

    @NotNull(message = "Salary is required")
    @Positive(message = "Salary must be positive")
    private Double salary;

    @NotNull(message = "Experience is required")
    @Min(value = 0, message = "Experience cannot be negative")
    private Integer experience;

    @NotNull(message = "Joining date is required")
    private LocalDate joiningDate;

    // getters & setters
}