import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.component.html'
})
export class LogoutComponent {
  token: any = "";
  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    this.token = localStorage.getItem('token');
  }

  logout() {
    this.authService.logout(this.token).subscribe(
      res => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      },
      err => {
      }
    );
  }
}
