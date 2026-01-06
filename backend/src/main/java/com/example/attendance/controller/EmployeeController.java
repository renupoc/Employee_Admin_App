package com.example.attendance.controller;

import org.springframework.web.bind.annotation.*;

import com.example.attendance.entity.Employee;
import com.example.attendance.repository.EmployeeRepository;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin
public class EmployeeController {

    private final EmployeeRepository employeeRepo;

    public EmployeeController(EmployeeRepository employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    // ✅ API Angular is calling
    @GetMapping("/by-email/{email}")
    public Employee getEmployeeByEmail(@PathVariable String email) {
        return employeeRepo.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));
    }
}
