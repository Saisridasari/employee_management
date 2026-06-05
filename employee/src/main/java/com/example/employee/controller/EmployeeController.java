package com.example.employee.controller;

import com.example.employee.dto.EmployeeRequestDTO;
import com.example.employee.dto.EmployeeResponseDTO;
import com.example.employee.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @PostMapping
    public EmployeeResponseDTO add(@Valid @RequestBody EmployeeRequestDTO dto) {
        return service.saveEmployee(dto);
    }

    @GetMapping
    public List<EmployeeResponseDTO> getAll() {
        return service.getAllEmployees();
    }

    @GetMapping("/{id}")
    public EmployeeResponseDTO getById(@PathVariable Long id) {
        return service.getEmployeeById(id);
    }

    @PutMapping("/{id}")
    public EmployeeResponseDTO update(@PathVariable Long id,
                                      @Valid @RequestBody EmployeeRequestDTO dto) {
        return service.updateEmployee(id, dto);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteEmployee(id);
        return "Deleted successfully";
    }
          // ------------------ SEARCH BY NAME ------------------
@GetMapping("/search/name")
public List<EmployeeResponseDTO> searchByName(
        @RequestParam String name) {

    return service.searchByName(name);
}

// ------------------ SEARCH BY EMAIL ------------------
@GetMapping("/search/email")
public List<EmployeeResponseDTO> searchByEmail(
        @RequestParam String email) {

    return service.searchByEmail(email);
}   
}