import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class VtonService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getVtonData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vton`);
  }

  createVton(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vton`, data);
  }

}
