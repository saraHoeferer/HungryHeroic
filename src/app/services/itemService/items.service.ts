import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/items'; //TODO: Change for Mobile App View

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  get(id: any): Promise<any> {
    return this.http.get(`${baseUrl}/${id}`).toPromise();
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  findByName(name: any): Observable<any> {
    return this.http.get(`${baseUrl}/specific/${name}`);
  }

  findSimilarByName(name: any): Observable<any> {
    return this.http.get(`${baseUrl}/similiar/${name}`)
  }

}
