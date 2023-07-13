import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/userModel/user.model';

// class used to connect to db user functions

const baseUrl = 'http://localhost:8080/api/user'; //TODO: Change for Mobile App View

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(baseUrl + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(baseUrl + 'user', { responseType: 'text' });
  }
  // Retrieve all users from the server
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }
  // Retrieve a specific user by ID from the server
  get(id: any): Observable<User> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  // Create a new user on the server
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  // Update an existing user on the server
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  // Delete a user from the server
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
