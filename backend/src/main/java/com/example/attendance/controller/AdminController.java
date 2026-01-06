package com.example.attendance.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendance.dto.AttendanceSummaryDTO;
import com.example.attendance.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/weekly-summary")
    public List<AttendanceSummaryDTO> weeklySummary(
            @RequestParam String startDate,
            @RequestParam String endDate) {

        return adminService.weeklySummary(
                LocalDate.parse(startDate),
                LocalDate.parse(endDate)
        );
    }
}
