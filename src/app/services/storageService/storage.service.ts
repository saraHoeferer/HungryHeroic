import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from 'src/app/models/storageModel/storage.model';

const baseUrl = 'http://localhost:8080/api/storage'; // TODO:

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Storage[]> {
    return this.http.get<Storage[]>(baseUrl);
  }

  get(id: any): Observable<Storage> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Storage[]> {
    return this.http.get<Storage[]>(`${baseUrl}?title=${title}`);
  }
}