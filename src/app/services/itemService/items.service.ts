import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/itemModel/item.model';

const baseUrl = 'http://192.168.0.239:8080/api/items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(baseUrl);
  }

  get(id: any): Promise<any> {
    return this.http.get(`${baseUrl}/${id}`).toPromise();
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

  findByTitle(title: any): Observable<Item[]> {
    return this.http.get<Item[]>(`${baseUrl}?title=${title}`);
  }

  findByName(name: any): Observable<any> {
    return this.http.get(`${baseUrl}/specific/${name}`);
  }

  findSimilarByName(name: any): Observable<any> {
    return this.http.get(`${baseUrl}/similiar/${name}`)
  }

}
