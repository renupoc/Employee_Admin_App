import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.API}/register`, data);
  }

  login(data: { email: string; password: string }) {
    return this.http.post<any>('http://localhost:8080/api/auth/login', data)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('employee', JSON.stringify(res.employee));
        })
      );
  }

  getEmployee() {
    return JSON.parse(localStorage.getItem('employee') || '{}');
  }
}
