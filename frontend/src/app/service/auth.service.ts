import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn = false;
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, { name, email, password });
  }

  logout(token: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/logout`, {}, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }
}
