import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from 'src/app/models/storageModel/storage.model';

const baseUrl = 'http://localhost:8080/api/storage'; //TODO: Change for Mobile App View
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }
  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }

  getAll(): Observable<Storage[]> {
    return this.http.get<Storage[]>(baseUrl);
  }
}
