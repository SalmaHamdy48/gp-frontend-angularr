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

  // الـ BehaviorSubject ده يخزن الcurrentUser ويقدر أي component يشترك فيه
  private _currentUser = new BehaviorSubject<any>(null);
  currentUser$ = this._currentUser.asObservable();

  constructor(private http: HttpClient) {
    // لو فيه user مخزن في localStorage، نرجعه عند تحميل الصفحة
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this._currentUser.next(JSON.parse(stored));
    }
  }

  get currentUser() {
    return this._currentUser.value;
  }

  getCurrentUser(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}auth/me`);
}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/login`, credentials).pipe(
      tap(res => {
        // بعد تسجيل الدخول نخزن الـ user info
        const userData = { id: res.user_id, token: res.access_token }; // <-- لو backend رجع user_id
        this._currentUser.next(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
      })
    );
  }

 
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/register`, userData);
  }
}