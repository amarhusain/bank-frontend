import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment config
import { UserData } from '../models/user.model';
import { ApiResponse } from '../models/toast.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;


  private currentUserSubject: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);
  public currentUser: Observable<UserData | null> = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) {
    // Check if user data exists in local storage on service initialization
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<ApiResponse> {
    const body = { username, password };
    return this.http.post<ApiResponse>(`${this.apiUrl}/auth/signin`, body).pipe(
      tap(response => {
        // Store the response in localStorage
        localStorage.setItem('userData', JSON.stringify(response.data));
        // this.loggedInSubject.next(true); // Notify subscribers
        this.currentUserSubject.next(response.data);
      })
    );
  }

  register(email: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/auth/signup`, { email, password });
  }



  // Method to get user data from localStorage
  getUserData(): UserData {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  logout(): Observable<any> {
    localStorage.removeItem('userData');
    // this.loggedInSubject.next(false); // Notify subscribers
    this.currentUserSubject.next(null);
    return this.http.post<any>(`${this.apiUrl}/auth/logout`, {});
  }

  isLoggedIn(): boolean {
    return this.getUserData() !== null; // Check if user data exists
  }

  getCurrentUser(): UserData | null {
    return this.currentUserSubject.value;
  }

}
