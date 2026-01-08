import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  user: any = {};

  departments = ['IDIS', 'VEDC', 'EMRI', 'GUSS', 'EMSS'];
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
  selectedMonth!: number;
  selectedYear!: number;

  daysInMonth = 0;
  workingDays = 0;
  showError = false;

  constructor(private employeeService: EmployeeService) {}

  // ✅ SINGLE ngOnInit (FIXED)
  ngOnInit(): void {
    
    this.generateYears();

    // ✅ 1. Load from localStorage
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      this.user = JSON.parse(storedUser);

      // ✅ combine first + last name
      this.user.fullName = `${this.user.firstName} ${this.user.lastName}`;

      // ✅ preselect department
      this.selectedDepartment = this.user.department;

      return; // ⛔ stop here, no API call needed
    }

    // ✅ 2. Fallback: load from API (refresh / direct URL access)
    const state = history.state;
    if (state?.email) {
      this.employeeService.getByEmail(state.email).subscribe({
        next: (res: any) => {
          this.user = res;
          this.user.fullName = `${res.firstName} ${res.lastName}`;
          this.selectedDepartment = res.department;

          // cache again
          localStorage.setItem('loggedInUser', JSON.stringify(res));
        },
        error: () => alert('Failed to load profile')
      });
    } else {
      alert('Session expired. Please login again.');
      this.logout();
    }
  }

  // ✅ Update department
  updateDepartment() {
    if (!this.selectedDepartment) return;

    this.employeeService
      .updateDepartment(this.user.id, this.selectedDepartment)
      .subscribe({
        next: (res: any) => {
          this.user.department = res.department;
          alert('Department updated successfully');
        },
        error: () => alert('Failed to update department')
      });
  }

  generateYears() {
    const year = new Date().getFullYear();
    this.years = Array.from({ length: 11 }, (_, i) => year - 5 + i);
  }

  onMonthOrYearChange() {
    if (this.selectedMonth && this.selectedYear) {
      this.daysInMonth = new Date(
        this.selectedYear,
        this.selectedMonth,
        0
      ).getDate();
      this.workingDays = 0;
    }
  }

  validateWorkingDays() {
    this.showError = this.workingDays > this.daysInMonth;
    if (this.showError) {
      this.workingDays = this.daysInMonth;
    }
  }

  isFormValid() {
    return this.selectedMonth && this.selectedYear && this.workingDays > 0;
  }

  submit() {
  const payload = {
    employeeId: this.user.id,
    month: this.selectedMonth,
    year: this.selectedYear,
    workingDays: this.workingDays
  };

  this.employeeService.submitAttendance(payload).subscribe(() => {
    alert('Attendance submitted successfully');
  });
}

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
