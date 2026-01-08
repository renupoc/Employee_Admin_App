package com.example.attendance.repository;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.attendance.entity.Attendance;
import com.example.attendance.entity.Employee;
import com.example.attendance.dto.AdminAttendanceDTO;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // -------------------------------
    // EMPLOYEE DASHBOARD
    // -------------------------------
    Optional<Attendance> findByEmployeeIdAndMonthAndYear(
        Long employeeId,
        int month,
        int year
);
    // -------------------------------
    // ADMIN DASHBOARD
    // -------------------------------
    @Query("""
        SELECT new com.example.attendance.dto.AdminAttendanceDTO(
            a.id,
            e.fullName,
            e.email,
            e.department,
            a.month,
            a.year,
            a.workingDays,
            a.totalWorkingDays,
            a.availabilityPercentage
        )
        FROM Attendance a
        JOIN a.employee e
        ORDER BY a.createdAt DESC
    """)
    List<AdminAttendanceDTO> findAllForAdmin();
}
