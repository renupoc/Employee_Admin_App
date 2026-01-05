import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private API = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  // ✅ Fetch employee from DB
  getByEmail(email: string): Observable<any> {
    return this.http.get(`${this.API}/by-email/${email}`);
  }

  // ✅ Update department in DB
  updateDepartment(id: number, department: string): Observable<any> {
    return this.http.put(`${this.API}/${id}/department`, { department });
  }
}
