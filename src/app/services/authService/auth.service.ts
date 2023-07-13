import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// class used to connect to db authentications functions

const baseUrl = 'http://localhost:8080/api/auth/'; //TODO: Change for Mobile App View

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // login in a specific user
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

  // register a new user
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

  // change a users password
  changePassword(user_name: string, user_old_password: string, user_new_password: string): Observable <any> {
    return this.http.put(
      baseUrl + 'passwordChange',
      {
        user_name,
        user_old_password,
        user_new_password
      },
      httpOptions
    )
  }
}
