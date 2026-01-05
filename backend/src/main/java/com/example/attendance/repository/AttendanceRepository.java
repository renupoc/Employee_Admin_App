package com.example.attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.attendance.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
}
