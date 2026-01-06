package com.example.attendance.controller;

import org.springframework.web.bind.annotation.*;

import com.example.attendance.dto.AttendanceRequest;
import com.example.attendance.entity.Attendance;
import com.example.attendance.entity.Employee;
import com.example.attendance.repository.AttendanceRepository;
import com.example.attendance.repository.EmployeeRepository;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin
public class AttendanceController {

    private final AttendanceRepository attendanceRepo;
    private final EmployeeRepository employeeRepo;

    public AttendanceController(
            AttendanceRepository attendanceRepo,
            EmployeeRepository employeeRepo) {
        this.attendanceRepo = attendanceRepo;
        this.employeeRepo = employeeRepo;
    }

    @PostMapping("/{employeeId}")
    public void markAttendance(
            @PathVariable Long employeeId,
            @RequestBody AttendanceRequest req) {

        Employee emp = employeeRepo.findById(employeeId).orElseThrow();

        Attendance attendance = attendanceRepo
                .findByEmployeeAndAttendanceDate(emp, req.date)
                .orElse(new Attendance());

        attendance.setEmployee(emp);
        attendance.setAttendanceDate(req.date);
        attendance.setStatus(req.status);

        attendanceRepo.save(attendance);
    }
}
