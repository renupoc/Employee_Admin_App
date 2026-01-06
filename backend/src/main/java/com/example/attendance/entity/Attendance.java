package com.example.attendance.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(
    name = "attendance",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"employee_id", "attendance_date"}
    )
)
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @Column(name = "attendance_date")
    private LocalDate attendanceDate;

    private String status;

    // ✅ GETTERS & SETTERS

    public Long getId() {
        return id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public LocalDate getAttendanceDate() {
        return attendanceDate;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public void setAttendanceDate(LocalDate attendanceDate) {
        this.attendanceDate = attendanceDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
