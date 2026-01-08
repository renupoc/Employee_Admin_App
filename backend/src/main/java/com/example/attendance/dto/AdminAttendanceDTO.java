package com.example.attendance.dto;

public class AdminAttendanceDTO {

    private Long attendanceId;
    private String name;
    private String email;
    private String department;
    private int month;
    private int year;
    private int workingDays;
    private int totalWorkingDays;
    private double availabilityPercentage;

    public AdminAttendanceDTO(
            Long attendanceId,
            String name,
            String email,
            String department,
            int month,
            int year,
            int workingDays,
            int totalWorkingDays,
            double availabilityPercentage) {

        this.attendanceId = attendanceId;
        this.name = name;
        this.email = email;
        this.department = department;
        this.month = month;
        this.year = year;
        this.workingDays = workingDays;
        this.totalWorkingDays = totalWorkingDays;
        this.availabilityPercentage = availabilityPercentage;
    }

    public Long getAttendanceId() { return attendanceId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getDepartment() { return department; }
    public int getMonth() { return month; }
    public int getYear() { return year; }
    public int getWorkingDays() { return workingDays; }
    public int getTotalWorkingDays() { return totalWorkingDays; }
    public double getAvailabilityPercentage() { return availabilityPercentage; }
}
