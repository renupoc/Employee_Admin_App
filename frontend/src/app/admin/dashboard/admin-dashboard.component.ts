import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminAttendance } from '../models/admin-attendance.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {

  employees: AdminAttendance[] = [];

  selectedDepartment = '';
  selectedMonth: number | '' = '';
  selectedYear: number | '' = '';

  departments: string[] = [];
  years: number[] = [];

  months = [
    { label: 'Jan', value: 1 }, { label: 'Feb', value: 2 },
    { label: 'Mar', value: 3 }, { label: 'Apr', value: 4 },
    { label: 'May', value: 5 }, { label: 'Jun', value: 6 },
    { label: 'Jul', value: 7 }, { label: 'Aug', value: 8 },
    { label: 'Sep', value: 9 }, { label: 'Oct', value: 10 },
    { label: 'Nov', value: 11 }, { label: 'Dec', value: 12 }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance() {
    this.http
      .get<AdminAttendance[]>('http://localhost:8080/api/admin/attendance')
      .subscribe((res: AdminAttendance[]) => {
        this.employees = res;
        this.departments = [...new Set(res.map(e => e.department))];
        this.years = [...new Set(res.map(e => e.year))];
      });
  }

  filteredEmployees() {
    return this.employees.filter(e =>
      (!this.selectedDepartment || e.department === this.selectedDepartment) &&
      (!this.selectedMonth || e.month === this.selectedMonth) &&
      (!this.selectedYear || e.year === this.selectedYear)
    );
  }

  getMonthName(month: number) {
    return this.months.find(m => m.value === month)?.label || '';
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
