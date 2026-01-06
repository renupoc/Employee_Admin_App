package com.example.attendance.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.attendance.dto.AttendanceSummaryDTO;
import com.example.attendance.entity.Attendance;
import com.example.attendance.entity.Employee;
import com.example.attendance.repository.AttendanceRepository;
import com.example.attendance.repository.EmployeeRepository;

@Service
public class AdminService {

    private final AttendanceRepository attendanceRepo;
    private final EmployeeRepository employeeRepo;

    public AdminService(
            AttendanceRepository attendanceRepo,
            EmployeeRepository employeeRepo) {
        this.attendanceRepo = attendanceRepo;
        this.employeeRepo = employeeRepo;
    }

    public List<AttendanceSummaryDTO> weeklySummary(
            LocalDate start, LocalDate end) {

        List<Employee> employees = employeeRepo.findAll();
        List<AttendanceSummaryDTO> result = new ArrayList<>();

        for (Employee emp : employees) {

            List<Attendance> records =
                    attendanceRepo.findWeekdaysAttendance(
                            emp.getId(), start, end);

            long totalDays = records.size();
            long presentDays = records.stream()
                    .filter(a -> !"LEAVE".equals(a.getStatus()))
                    .count();

            AttendanceSummaryDTO dto = new AttendanceSummaryDTO();
            dto.employeeName = emp.getFullName();
            dto.email = emp.getEmail();
            dto.totalWorkingDays = totalDays;
            dto.presentDays = presentDays;
            dto.percentage =
                    totalDays == 0 ? 0 : (presentDays * 100.0 / totalDays);

            result.add(dto);
        }

        return result;
    }
}
