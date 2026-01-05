package com.example.attendance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.attendance.entity.Attendance;
import com.example.attendance.entity.Employee;
import com.example.attendance.repository.AttendanceRepository;
import com.example.attendance.repository.EmployeeRepository;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:4200")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepo;

    @Autowired
    private EmployeeRepository employeeRepo;

    @PostMapping
    public Attendance save(@RequestBody Attendance att) {
        Employee emp = employeeRepo.findById(att.getEmployee().getId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        att.setEmployee(emp);
        return attendanceRepo.save(att);
    }

    @GetMapping
    public List<Attendance> getAll() {
        return attendanceRepo.findAll();
    }
}
