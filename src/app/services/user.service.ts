import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);


  updateUserField(field: string, value: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/update-user-field`, { [field]: value });
  }
}
