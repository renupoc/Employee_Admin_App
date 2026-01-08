package com.example.attendance.controller;

import org.springframework.web.bind.annotation.*;

import com.example.attendance.dto.LoginRequest;
import com.example.attendance.entity.Employee;
import com.example.attendance.repository.EmployeeRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final EmployeeRepository employeeRepo;

    public AuthController(EmployeeRepository employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    // ✅ LOGIN (already working)
    @PostMapping("/login")
    public Employee login(@RequestBody LoginRequest request) {

        return employeeRepo.findByEmail(request.email)
                .filter(emp -> emp.getPassword().equals(request.password))
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));
    }

    // ✅ REGISTER (THIS WAS MISSING)
    @PostMapping("/register")
    public Employee register(@RequestBody Employee employee) {

        if (employeeRepo.findByEmail(employee.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        employee.setRole("EMPLOYEE");
        return employeeRepo.save(employee);
    }
}