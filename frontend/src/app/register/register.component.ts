import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onRegister(): void {
    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    this.authService.register(name, email, password).subscribe(
      res => {
        console.log(res);
        if (res.state == "success") {
          const config: MatSnackBarConfig = {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          };
          this.snackBar.open("Registration successful! You can now log in with your credentials.", undefined, config);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2300);
        }
        // Redirect to dashboard page
      },
      err => {
        console.log(err)
        const config: MatSnackBarConfig = {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        };
        this.snackBar.open(err.error.error, undefined, config);
      }
    );
  }
}
