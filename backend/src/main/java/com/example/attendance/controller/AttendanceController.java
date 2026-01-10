package com.example.attendance.controller;

import com.example.attendance.dto.AttendanceRequest;
import com.example.attendance.entity.Attendance;
import com.example.attendance.entity.Employee;
import com.example.attendance.repository.AttendanceRepository;
import com.example.attendance.repository.EmployeeRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:4200")
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;

    public AttendanceController(
            AttendanceRepository attendanceRepository,
            EmployeeRepository employeeRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
    }

    // ================================
    // EMPLOYEE – Submit Attendance
    // ================================
    @PostMapping("/submit/{employeeId}")
    public ResponseEntity<?> submitAttendance(
            @PathVariable Long employeeId,
            @RequestBody AttendanceRequest request) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setMonth(request.getMonth());
        attendance.setYear(request.getYear());
        attendance.setTotalDays(request.getTotalDays());
        attendance.setWorkingDays(request.getWorkingDays());

        attendanceRepository.save(attendance);

        return ResponseEntity.ok("Attendance submitted successfully");
    }

    // ================================
    // EMPLOYEE – Get own attendance
    // ================================
    @GetMapping("/employee/{employeeId}")
    public List<Attendance> getAttendanceByEmployee(@PathVariable Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId);
    }

    // ================================
    // ADMIN – Get ALL attendance
    // ================================
    @GetMapping("/admin/all")
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    // ================================
    // ADMIN – Employee + Attendance
    // ================================
    @GetMapping("/admin/employees-attendance")
    public List<Map<String, Object>> getEmployeesWithAttendance() {

        return attendanceRepository.findAll().stream().map(a -> {
            Map<String, Object> map = new HashMap<>();
            map.put("employeeId", a.getEmployee().getId());
            map.put("name", a.getEmployee().getFirstName() + " " + a.getEmployee().getLastName());
            map.put("email", a.getEmployee().getEmail());
            map.put("department", a.getEmployee().getDepartment());
            map.put("month", a.getMonth());
            map.put("year", a.getYear());
            map.put("totalDays", a.getTotalDays());
            map.put("workingDays", a.getWorkingDays());
            return map;
        }).toList();
    }
}
