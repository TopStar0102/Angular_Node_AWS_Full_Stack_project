import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getProducts(token: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  addProduct(token: any, name: string, description: string, price: number) {
    return this.http.post(`${this.baseUrl}/products/addProduct`, {name, description, price}, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  deleteProduct(token: any, id: any) {
    return this.http.post(`${this.baseUrl}/products/deleteProduct`, {id}, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }

  editProduct(token: any, id:any, name: string, description: string, price: number) {
    return this.http.post(`${this.baseUrl}/products/editProduct`, {id, name, description, price}, {
      headers: new HttpHeaders().set('Authorization', token),
    });
  }
}
