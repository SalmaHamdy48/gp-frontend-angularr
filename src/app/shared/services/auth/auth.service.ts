import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  private _currentUser = new BehaviorSubject<any>(null);
  currentUser$ = this._currentUser.asObservable();

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this._currentUser.next(JSON.parse(stored));
    }
  }

  get currentUser() {
    return this._currentUser.value;
  }
  clearSession(): void {
  localStorage.removeItem('currentUser');
  sessionStorage.clear();

  // reset state
  this._currentUser.next(null);
}

  getCurrentUser(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}auth/me`);
}
login(credentials: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}auth/login`, credentials).pipe(
    tap(res => {
      const userData = {
        id: res.user_id,
        username: res.username,
        email: res.email,
        token: res.access_token
      };

      this._currentUser.next(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
    })
  );
}
getUserById(userId: string): Observable<any> {
  return this.http.get(`${this.apiUrl}/user/${userId}`);
}
 
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/register`, userData);
  }

 logout(): Observable<any> {
  return this.http.post(`${this.apiUrl}auth/logout`, {}).pipe(
    tap(() => {
      this.clearSession();
    })
  );
}
}