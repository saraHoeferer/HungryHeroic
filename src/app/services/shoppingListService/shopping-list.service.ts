import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lists } from 'src/app/models/Lists/lists.model';

const baseUrl = 'http://192.168.0.239:8080/api/shopping';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{

  constructor(private http: HttpClient) { }

  getAll(): Observable<Lists[]> {
    return this.http.get<Lists[]>(baseUrl);
  }

  get(id: any): Observable<Lists> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getUserShopping(id: any): Observable<Lists[]> {
    return this.http.get<Lists[]>(`${baseUrl}/user/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(item_id: any, user_id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/one/${item_id}/${user_id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Lists[]> {
    return this.http.get<Lists[]>(`${baseUrl}?title=${title}`);
  }
}