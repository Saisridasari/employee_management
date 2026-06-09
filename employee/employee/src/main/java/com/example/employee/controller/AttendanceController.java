package com.example.employee.controller;

import com.example.employee.entity.Attendance;
import com.example.employee.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }

    // Employee Check-In
    @PostMapping("/checkin/{employeeId}")
    public Attendance checkIn(@PathVariable Long employeeId) {
        return service.checkIn(employeeId);
    }

    // Employee Check-Out
    @PutMapping("/checkout/{id}")
    public Attendance checkOut(@PathVariable Long id) {
        return service.checkOut(id);
    }

    // Attendance History
    @GetMapping
    public List<Attendance> history() {
        return service.history();
    }
}