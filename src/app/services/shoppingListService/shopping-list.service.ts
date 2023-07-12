import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lists } from 'src/app/models/Lists/lists.model';
import { ShoppingList } from 'src/app/models/shoppingListModel/shopping-list.model';

const baseUrl = 'http://localhost:8080/api/shopping'; //:TODO

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{

  constructor(private http: HttpClient) { }

  getAll(): Observable<Lists[]> {
    return this.http.get<Lists[]>(baseUrl);
  }

  get(item_id: any, user_id: any): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(`${baseUrl}/${item_id}/${user_id}`);
  }

  getUserShopping(id: any): Promise<any> {
    return this.http.get<Lists[]>(`${baseUrl}/user/${id}`).toPromise();
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(item_id: any, user_id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${item_id}/${user_id}`, data);
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