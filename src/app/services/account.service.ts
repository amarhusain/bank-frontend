import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

    private baseUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) {}

  getBalance(accountNumber: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/accounts/${accountNumber}/balance`);
  }

  credit(accountNumber: string, amount: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/accounts/${accountNumber}/credit?amount=${amount}`, {});
  }

  debit(accountNumber: string, amount: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/accounts/${accountNumber}/debit?amount=${amount}`, {});
  }
}
