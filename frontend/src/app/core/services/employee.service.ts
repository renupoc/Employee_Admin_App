import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // ✅ GET employee by email (used after refresh)
  getByEmail(email: string) {
    return this.http.get<any>(
      `${this.baseUrl}/employees/by-email?email=${email}`
    );
  }

  // ✅ UPDATE department
  updateDepartment(employeeId: number, department: string) {
    return this.http.put<any>(
      `${this.baseUrl}/employees/${employeeId}/department`,
      { department }
    );
  }

  // ✅ SUBMIT attendance
  submitAttendance(payload: any) {
    return this.http.post(
      `${this.baseUrl}/attendance/${payload.employeeId}`,
      payload
    );
  }
}
