package com.example.attendance.controller;

import org.springframework.web.bind.annotation.*;

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

    // EMPLOYEE DASHBOARD SUBMIT
    @PostMapping("/submit/{employeeId}")
    public Attendance submitAttendance(
            @PathVariable Long employeeId,
            @RequestBody Attendance request) {

        Employee emp = employeeRepo.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Check if already exists for month + year
        Attendance attendance = attendanceRepo
                .findByEmployeeIdAndMonthAndYear(
                        employeeId,
                        request.getMonth(),
                        request.getYear()
                )
                .orElse(new Attendance());

        attendance.setEmployee(emp);
        attendance.setMonth(request.getMonth());
        attendance.setYear(request.getYear());
        attendance.setWorkingDays(request.getWorkingDays());
        attendance.setTotalWorkingDays(request.getTotalWorkingDays());

        // Calculate percentage
        double percentage =
                (request.getWorkingDays() * 100.0) / request.getTotalWorkingDays();
        attendance.setAvailabilityPercentage(percentage);

        return attendanceRepo.save(attendance);
    }
}
