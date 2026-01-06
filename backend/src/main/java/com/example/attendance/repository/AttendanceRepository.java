package com.example.attendance.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.attendance.entity.Attendance;
import com.example.attendance.entity.Employee;

public interface AttendanceRepository
        extends JpaRepository<Attendance, Long> {

    Optional<Attendance> findByEmployeeAndAttendanceDate(
            Employee employee, LocalDate date);

    @Query("""
        SELECT a FROM Attendance a
        WHERE a.employee.id = :empId
          AND a.attendanceDate BETWEEN :start AND :end
          AND FUNCTION('DAYOFWEEK', a.attendanceDate) NOT IN (1,7)
    """)
    List<Attendance> findWeekdaysAttendance(
            @Param("empId") Long empId,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );
}
