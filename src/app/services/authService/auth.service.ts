import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user_name: string, user_password: string): Observable<any> {
    return this.http.post(
      baseUrl + 'signin',
      {
        user_name,
        user_password,
      },
      httpOptions
    );
  }

  register(user_name: string, user_mail: string, user_password: string): Observable<any> {
    return this.http.post(
      baseUrl + 'signup',
      {
        user_name,
        user_mail,
        user_password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(baseUrl + 'signout', { }, httpOptions);
  }
}