import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  // Raw list from localStorage
  employees: any[] = [];

  // Filters
  selectedDepartment: string = '';
  selectedMonth: number | '' = '';
  selectedYear: number | '' = '';

  // Dropdown data
  departments: string[] = [];
  years: number[] = [];

  months = [
    { label: 'Jan', value: 1 },
    { label: 'Feb', value: 2 },
    { label: 'Mar', value: 3 },
    { label: 'Apr', value: 4 },
    { label: 'May', value: 5 },
    { label: 'Jun', value: 6 },
    { label: 'Jul', value: 7 },
    { label: 'Aug', value: 8 },
    { label: 'Sep', value: 9 },
    { label: 'Oct', value: 10 },
    { label: 'Nov', value: 11 },
    { label: 'Dec', value: 12 }
  ];

  // Editing
  editingEmployee: any = null;
  editModel: any = {
    department: '',
    workingDays: 0
  };

  ngOnInit() {
    this.loadEmployees();
  }

  // -------------------------
  // LOAD DATA
  // -------------------------
  loadEmployees() {
    const data = localStorage.getItem('employeeAvailabilityList');
    this.employees = data ? JSON.parse(data) : [];

    // Build unique departments & years
    this.departments = [...new Set(this.employees.map(e => e.department))];

    this.years = [
      ...new Set(
        this.employees.map(e => Number(e.month.split('-')[0]))
      )
    ];
  }

  // -------------------------
  // FILTERED LIST (USED IN HTML)
  // -------------------------
  filteredEmployees() {
    return this.employees.filter(emp => {
      const [year, month] = emp.month.split('-').map(Number);

      return (
        (!this.selectedDepartment || emp.department === this.selectedDepartment) &&
        (!this.selectedMonth || month === this.selectedMonth) &&
        (!this.selectedYear || year === this.selectedYear)
      );
    });
  }

  // -------------------------
  // DATE HELPERS
  // -------------------------
  getMonthName(monthKey: string) {
    const month = Number(monthKey.split('-')[1]);
    return this.months.find(m => m.value === month)?.label || '';
  }

  getYear(monthKey: string) {
    return Number(monthKey.split('-')[0]);
  }

  getDaysInMonth(monthKey: string) {
    const [year, month] = monthKey.split('-').map(Number);
    return new Date(year, month, 0).getDate();
  }

  // -------------------------
  // CALCULATIONS
  // -------------------------
  availabilityPercent(emp: any) {
    const totalDays = this.getDaysInMonth(emp.month);
    return Math.round((emp.workingDays / totalDays) * 100);
  }

  // -------------------------
  // EDIT / SAVE / CANCEL
  // -------------------------
  editEmployee(emp: any) {
    this.editingEmployee = emp;
    this.editModel = {
      department: emp.department,
      workingDays: emp.workingDays
    };
  }

  saveEmployee() {
    if (!this.editingEmployee) return;

    this.editingEmployee.department = this.editModel.department;
    this.editingEmployee.workingDays = this.editModel.workingDays;

    localStorage.setItem(
      'employeeAvailabilityList',
      JSON.stringify(this.employees)
    );

    this.cancelEdit();
  }

  cancelEdit() {
    this.editingEmployee = null;
    this.editModel = { department: '', workingDays: 0 };
  }

  // -------------------------
  // DELETE
  // -------------------------
  deleteEmployee(index: number) {
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.employees.splice(index, 1);

    localStorage.setItem(
      'employeeAvailabilityList',
      JSON.stringify(this.employees)
    );
  }

  // -------------------------
  // LOGOUT
  // -------------------------
  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
