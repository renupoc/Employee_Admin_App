package com.example.attendance.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "attendance",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"employee_id", "month", "year"})
       })
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // -------------------------
    // RELATION
    // -------------------------
    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    // -------------------------
    // ATTENDANCE DATA
    // -------------------------
    @Column(nullable = false)
    private int month;

    @Column(nullable = false)
    private int year;

    @Column(name = "working_days", nullable = false)
    private int workingDays;

    @Column(name = "total_working_days", nullable = false)
    private int totalWorkingDays;

    @Column(name = "availability_percentage", nullable = false)
    private double availabilityPercentage;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // -------------------------
    // GETTERS & SETTERS
    // -------------------------
    public Long getId() { return id; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

    public int getMonth() { return month; }
    public void setMonth(int month) { this.month = month; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public int getWorkingDays() { return workingDays; }
    public void setWorkingDays(int workingDays) { this.workingDays = workingDays; }

    public int getTotalWorkingDays() { return totalWorkingDays; }
    public void setTotalWorkingDays(int totalWorkingDays) {
        this.totalWorkingDays = totalWorkingDays;
    }

    public double getAvailabilityPercentage() { return availabilityPercentage; }
    public void setAvailabilityPercentage(double availabilityPercentage) {
        this.availabilityPercentage = availabilityPercentage;
    }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
