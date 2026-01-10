import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../core/services/attendance.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  user: any = {};

  departments = ['VEDC', 'GUSS', 'EMSS'];
  selectedDepartment = '';

  months = [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 }
  ];

  years: number[] = [];
  selectedMonth: number | '' = '';
  selectedYear: number | '' = '';

  daysInMonth = 0;
  workingDays = 0;
  showError = false;

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.generateYears();

    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);

      // full name for UI
      this.user.fullName = this.user.firstName + ' ' + this.user.lastName;

      // department
      this.selectedDepartment = this.user.department;
    }
  }

  generateYears() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 100 }, (_, i) => currentYear - 5 + i);
  }

  onMonthOrYearChange() {
    if (this.selectedMonth && this.selectedYear) {
      this.daysInMonth = new Date(
        this.selectedYear,
        this.selectedMonth,
        0
      ).getDate();
      this.workingDays = 0;
      this.showError = false;
    }
  }

  validateWorkingDays() {
    if (this.workingDays > this.daysInMonth) {
      this.showError = true;
      this.workingDays = this.daysInMonth;
    } else {
      this.showError = false;
    }
  }

  isFormValid() {
    return (
      this.selectedDepartment &&
      this.selectedMonth &&
      this.selectedYear &&
      this.workingDays > 0 &&
      this.workingDays <= this.daysInMonth
    );
  }

  // ================================
  // ✅ FIXED SUBMIT METHOD (BACKEND)
  // ================================
 submit() {

  if (!this.user?.id) {
    alert('User not logged in');
    return;
  }

  if (!this.selectedMonth || !this.selectedYear) {
    alert('Please select month and year');
    return;
  }

  const payload = {
    month: Number(this.selectedMonth),
    year: Number(this.selectedYear),
    totalDays: this.daysInMonth,
    workingDays: this.workingDays
  };

  this.attendanceService
    .submitAttendance(this.user.id, payload)
    .subscribe({
      next: () => {
        alert('Attendance submitted successfully');
      },
      error: err => {
        console.error(err);
        alert('Submit failed');
      }
    });
}

  logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  }
}
