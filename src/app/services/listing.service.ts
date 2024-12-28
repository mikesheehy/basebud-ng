import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../models/listing.model';

const baseUrl = 'http://localhost:8080/api/listings';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Listing[]> {
    return this.http.get<Listing[]>(baseUrl);
  }

  get(id: any): Observable<Listing> {
    return this.http.get<Listing>(`${baseUrl}/${id}`);
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

  findByTitle(title: any): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${baseUrl}?title=${title}`);
  }
}
