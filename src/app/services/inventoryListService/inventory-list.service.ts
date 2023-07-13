import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryList } from 'src/app/models/inventoryListModel/inventory-list.model';

// class used to connect to db inventory functions

const baseUrl = 'http://localhost:8080/api/inventory'; //TODO: Change for Mobile App View

@Injectable({
  providedIn: 'root'
})
export class InventoryListService{

  constructor(private http: HttpClient) { }
  
  // get a specifiv Inventory entry
  get(item_id: number, user_id: number,): Observable<InventoryList[]> {
    return this.http.get<InventoryList[]>(`${baseUrl}/${item_id}/${user_id}`);
  }

  // the the number of all Inventory entries a specific user has
  getCount(user_id: number): Observable<any>{
    return this.http.get<any>(baseUrl+"/count/"+user_id)
  }

  // get the Inventory of a specific user
  getUserInventory(id: any): Promise<any> {
    return this.http.get(baseUrl+"/user/"+id).toPromise();
  }

  // create a Inventory entry
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // update a specific Inventory entry
  update(item_id: any, user_id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${item_id}/${user_id}`, data);
  }

  // delte a specific Inventory entry
  delete(item_id: any, user_id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/one/${item_id}/${user_id}`);
  }
}
