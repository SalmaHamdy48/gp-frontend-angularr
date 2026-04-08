// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class ProfileService {
//   constructor(private http: HttpClient) {}

//   getClosetItems(): Observable<any> {
//     return this.http.get('/api/profile/closet');
//   }

//   addClosetItem(item: any): Observable<any> {
//     return this.http.post('/api/profile/closet', item);
//   }

//   uploadProfileImage(image: File): Observable<any> {
//     const formData = new FormData();
//     formData.append('image', image);
//     return this.http.post('/api/profile/upload-image', formData);
//   }
// }
