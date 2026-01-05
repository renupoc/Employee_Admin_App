import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

this.auth.login({
  email: this.email,
  password: this.password
}).subscribe({
  next: (employee: any) => {
    this.router.navigate(
      ['/employee/dashboard'],
      { state: { email: employee.email } }
    );
  },
  error: () => alert('Invalid email or password')
});
  }
}
