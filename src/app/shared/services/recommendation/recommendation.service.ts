import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRecommendations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recommendations`);
  }

  createRecommendation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recommendations`, data);
  }
}
