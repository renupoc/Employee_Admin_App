package com.example.attendance.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.attendance.dto.AdminAttendanceDTO;
import com.example.attendance.repository.AttendanceRepository;

@Service
public class AdminService {

    private final AttendanceRepository attendanceRepo;

    public AdminService(AttendanceRepository attendanceRepo) {
        this.attendanceRepo = attendanceRepo;
    }

    public List<AdminAttendanceDTO> getAllAttendance() {
        return attendanceRepo.findAllForAdmin();
    }
}
