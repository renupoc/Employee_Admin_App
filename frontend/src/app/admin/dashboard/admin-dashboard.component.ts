import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface EmployeeAvailability {
  id: number;
  name: string;
  email: string;
  department: string;
  month: string;        // yyyy-MM
  workingDays: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  private API = 'http://localhost:8080/api/attendance';

  departments = ['VEDC', 'GUSS', 'IDIS', 'EMRI'];

  // 🔹 Filters
  selectedDepartment = '';
  selectedMonth = '';
  selectedYear = '';

  months = [
    { value: '01', label: 'Jan' },
    { value: '02', label: 'Feb' },
    { value: '03', label: 'Mar' },
    { value: '04', label: 'Apr' },
    { value: '05', label: 'May' },
    { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' },
    { value: '08', label: 'Aug' },
    { value: '09', label: 'Sep' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' }
  ];

  years: number[] = [];

  employees: EmployeeAvailability[] = [];

  // 🔹 Edit state
  editingEmployee: EmployeeAvailability | null = null;

  editModel = {
    department: '',
    workingDays: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  /* ===== LOAD FROM DB ===== */

  loadEmployees(): void {
    this.http.get<EmployeeAvailability[]>(this.API).subscribe({
      next: (data) => {
        this.employees = data;
        this.extractYears();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load attendance data');
      }
    });
  }

  extractYears(): void {
    this.years = Array.from(
      new Set(this.employees.map(e => Number(e.month.split('-')[0])))
    );
  }

  filteredEmployees(): EmployeeAvailability[] {
    return this.employees.filter(emp => {
      const [year, month] = emp.month.split('-');

      return (
        (!this.selectedDepartment || emp.department === this.selectedDepartment) &&
        (!this.selectedMonth || month === this.selectedMonth) &&
        (!this.selectedYear || year === this.selectedYear)
      );
    });
  }

  /* ===== Helpers ===== */

  getMonthName(month: string): string {
    const [, m] = month.split('-');
    const date = new Date(2000, Number(m) - 1);
    return date.toLocaleString('default', { month: 'short' });
  }

  getYear(month: string): string {
    return month.split('-')[0];
  }

  getDaysInMonth(month: string): number {
    const [year, m] = month.split('-').map(Number);
    return new Date(year, m, 0).getDate();
  }

  availabilityPercent(emp: EmployeeAvailability): number {
    const total = this.getDaysInMonth(emp.month);
    return Math.round((emp.workingDays / total) * 100);
  }

  /* ===== Actions ===== */

  editEmployee(emp: EmployeeAvailability): void {
    this.editingEmployee = emp;
    this.editModel = {
      department: emp.department,
      workingDays: emp.workingDays
    };
  }

  saveEmployee(): void {
    if (!this.editingEmployee) return;

    const maxDays = this.getDaysInMonth(this.editingEmployee.month);

    if (
      this.editModel.workingDays < 1 ||
      this.editModel.workingDays > maxDays
    ) {
      alert(`Working days must be between 1 and ${maxDays}`);
      return;
    }

    const updated = {
      ...this.editingEmployee,
      department: this.editModel.department,
      workingDays: this.editModel.workingDays
    };

    this.http.put(`${this.API}/${updated.id}`, updated).subscribe({
      next: () => {
        Object.assign(this.editingEmployee!, updated);
        this.editingEmployee = null;
        alert('Saved successfully');
      },
      error: (err) => {
        console.error(err);
        alert('Update failed');
      }
    });
  }

  cancelEdit(): void {
    this.editingEmployee = null;
  }

  deleteEmployee(emp: EmployeeAvailability): void {
    if (!confirm('Delete this entry?')) return;

    this.http.delete(`${this.API}/${emp.id}`).subscribe({
      next: () => {
        this.employees = this.employees.filter(e => e.id !== emp.id);
        this.extractYears();
      },
      error: (err) => {
        console.error(err);
        alert('Delete failed');
      }
    });
  }

  logout(): void {
    sessionStorage.clear();
    window.location.href = '/login';
  }

  
}
