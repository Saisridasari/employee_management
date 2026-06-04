package com.example.employee.service;

import com.example.employee.entity.Department;
import com.example.employee.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository repository;

    public DepartmentService(DepartmentRepository repository) {
        this.repository = repository;
    }

    public Department saveDepartment(Department department) {
        return repository.save(department);
    }

    public List<Department> getAllDepartments() {
        return repository.findAll();
    }
}