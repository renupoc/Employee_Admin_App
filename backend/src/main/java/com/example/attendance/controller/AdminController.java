package com.example.attendance.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.attendance.dto.AdminAttendanceDTO;
import com.example.attendance.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/attendance")
    public List<AdminAttendanceDTO> getAllAttendance() {
        return adminService.getAllAttendance();
    }
}
