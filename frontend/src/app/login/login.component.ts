import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (email && password) {
      this.authService.login(email, password).subscribe(
        res => {
          if(res.token) {
            this.authService.isLoggedIn = true;
            localStorage.setItem('token', "Bearer " + res.token);
            this.router.navigate(['/products']);
          }
          // Redirect to dashboard page
        },
        err => {
          const config: MatSnackBarConfig = {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['blue-snackbar']
          };
          this.snackBar.open(err.error, undefined, config);
        }
      );
    }
  }

  goRegisterPage(): void {
    this.router.navigate(['/register']);
  }
}
