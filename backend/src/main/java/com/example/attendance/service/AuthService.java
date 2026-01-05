package com.example.attendance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.attendance.entity.Employee;
import com.example.attendance.repository.EmployeeRepository;

@Service
public class AuthService {

    @Autowired
    private EmployeeRepository repository;

    public Employee register(Employee emp) {
        return repository.save(emp);
    }

    public Employee login(String email, String password) {
        return repository.findByEmail(email)
                .filter(e -> e.getPassword().equals(password))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}
