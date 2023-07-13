import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingList } from 'src/app/models/shoppingListModel/shopping-list.model';

// class used to connect to db shopping functions

const baseUrl = 'http://localhost:8080/api/shopping'; //TODO: Change for Mobile App View

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{

  constructor(private http: HttpClient) { }

  // get a specfic Shoppinglist entry
  get(item_id: any, user_id: any): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(`${baseUrl}/${item_id}/${user_id}`);
  }

  // get the count of all entries in a specific users Shoppinglist
  getCount(user_id: number): Observable<any>{
    return this.http.get<any>(baseUrl+"/count/"+user_id)
  }

  // get a specific users ShoppingList
  getUserShopping(id: any): Promise<any> {
    return this.http.get<ShoppingList[]>(`${baseUrl}/user/${id}`).toPromise();
  }

  // create a Shoppinglist entry
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // update a specfic Shoppinglist entry
  update(item_id: any, user_id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${item_id}/${user_id}`, data);
  }

  // delete a specfic Shoppinglist entry
  delete(item_id: any, user_id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/one/${item_id}/${user_id}`);
  }
}
