package com.example.employee.service;

import com.example.employee.entity.Attendance;
import com.example.employee.repository.AttendanceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository repo;

    public AttendanceService(AttendanceRepository repo) {
        this.repo = repo;
    }

    // Check In
    public Attendance checkIn(Long employeeId) {

        Attendance attendance = new Attendance();

        attendance.setEmployeeId(employeeId);
        attendance.setCheckIn(LocalDateTime.now());

        return repo.save(attendance);
    }

    // Check Out
    public Attendance checkOut(Long id) {

        Attendance attendance = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance not found"));

        attendance.setCheckOut(LocalDateTime.now());

        return repo.save(attendance);
    }

    // Attendance History
    public List<Attendance> history() {
        return repo.findAll();
    }
}