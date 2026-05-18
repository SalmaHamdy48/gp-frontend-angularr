import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ✅ رفع صورة
  uploadProfilePhoto(userId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}upload-profile-photo`, formData);
  }
getUserById(userId: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/user/${userId}`);
}
 
  // ✅ جلب صورة
  getProfilePhoto(userId: string): Observable<any> {
    const params = new HttpParams().set('user_id', userId);

    return this.http.get(`${this.baseUrl}get-profile-photo`, { params });
  }
// GET closet items
getClosetItems(userId: string): Observable<any> {
  const params = new HttpParams().set('user_id', userId);

  return this.http.get(`${this.baseUrl}closet/items`, { params });
}

// POST closet item
addClosetItem(userId: string, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);

  const params = new HttpParams().set('user_id', userId);

  return this.http.post(`${this.baseUrl}closet/items`, formData, {
    params
  });
}

  // ✅ حذف صورة
  deleteProfilePhoto(userId: string): Observable<any> {
    const params = new HttpParams().set('user_id', userId);

    return this.http.delete(`${this.baseUrl}delete-profile-photo`, { params });
  }
}