

package com.example.employee.service;

import com.example.employee.dto.EmployeeRequestDTO;
import com.example.employee.dto.EmployeeResponseDTO;
import com.example.employee.entity.Employee;
import com.example.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    private final EmployeeRepository repo;

    public EmployeeService(EmployeeRepository repo) {
        this.repo = repo;
    }

    // ------------------ ENTITY → DTO ------------------
    private EmployeeResponseDTO mapToDTO(Employee emp) {
        EmployeeResponseDTO dto = new EmployeeResponseDTO();
        dto.setId(emp.getId());
        dto.setName(emp.getName());
        dto.setEmail(emp.getEmail());
        dto.setDepartment(emp.getDepartment());
        dto.setSalary(emp.getSalary());
        dto.setExperience(emp.getExperience());
        dto.setJoiningDate(emp.getJoiningDate());
        return dto;
    }

    // ------------------ DTO → ENTITY ------------------
    private Employee mapToEntity(EmployeeRequestDTO dto) {
        Employee emp = new Employee();
        emp.setName(dto.getName());
        emp.setEmail(dto.getEmail());
        emp.setDepartment(dto.getDepartment());
        emp.setSalary(dto.getSalary());
        emp.setExperience(dto.getExperience());
        emp.setJoiningDate(dto.getJoiningDate());
        return emp;
    }

    // ------------------ CREATE ------------------
    public EmployeeResponseDTO saveEmployee(EmployeeRequestDTO dto) {
        Employee saved = repo.save(mapToEntity(dto));
        return mapToDTO(saved);
    }

    // ------------------ GET ALL ------------------
    public List<EmployeeResponseDTO> getAllEmployees() {
        return repo.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ------------------ GET BY ID ------------------
    public EmployeeResponseDTO getEmployeeById(Long id) {
        Employee emp = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return mapToDTO(emp);
    }

    // ------------------ UPDATE ------------------
    public EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO dto) {
        Employee emp = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        emp.setName(dto.getName());
        emp.setEmail(dto.getEmail());
        emp.setDepartment(dto.getDepartment());
        emp.setSalary(dto.getSalary());
        emp.setExperience(dto.getExperience());
        emp.setJoiningDate(dto.getJoiningDate());

        return mapToDTO(repo.save(emp));
    }

    // ------------------ DELETE ------------------
    public void deleteEmployee(Long id) {
        repo.deleteById(id);
    }
         // ------------------ SEARCH BY NAME ------------------
public List<EmployeeResponseDTO> searchByName(String name) {
    return repo.findByNameContainingIgnoreCase(name)
            .stream()
            .map(this::mapToDTO)
            .toList();
}

// ------------------ SEARCH BY EMAIL ------------------
public List<EmployeeResponseDTO> searchByEmail(String email) {
    return repo.findByEmailContainingIgnoreCase(email)
            .stream()
            .map(this::mapToDTO)
            .toList();
}
}