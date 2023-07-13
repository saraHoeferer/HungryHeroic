import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// class used to connect to db items functions

const baseUrl = 'http://localhost:8080/api/items'; //TODO: Change for Mobile App View

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }
  
  // get a specific Item
  get(id: any): Promise<any> {
    return this.http.get(`${baseUrl}/${id}`).toPromise();
  }

  // create a Item
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // find a specific item which has exactly that name
  findByName(name: any): Observable<any> {
    return this.http.get(`${baseUrl}/specific/${name}`);
  }

  // find a specific item which has a similar name
  findSimilarByName(name: any): Observable<any> {
    return this.http.get(`${baseUrl}/similiar/${name}`)
  }

}
