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

 createVton(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}predict/post`, data);
}

getVtonData(): Observable<Blob> {
 return this.http.get(`${this.apiUrl}predict/get`, { responseType: 'blob' });
}

}
