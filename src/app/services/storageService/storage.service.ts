import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from 'src/app/models/storageModel/storage.model';

// class used to connect to db storage functions

const baseUrl = 'http://localhost:8080/api/storage'; //TODO: Change for Mobile App View
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  //clean the sessionStorage
  clean(): void {
    window.sessionStorage.clear();
  }

  //save the User in the sessionStorage
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  //get the a specific user by key form the sessionStorage
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  //check if a specific users entry is in the sessionStroage
  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }


  //get all Storage Locations from the db
  getAll(): Observable<Storage[]> {
    return this.http.get<Storage[]>(baseUrl);
  }
}
