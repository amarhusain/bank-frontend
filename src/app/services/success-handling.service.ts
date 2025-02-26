import { inject, Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { ApiResponse } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class SuccessHandlingService {

  private toastService = inject(ToastService);

  handleSearchSuccess(response: ApiResponse): void {
    // Handle successful response
    console.log('Search Results:', response);
    this.toastService.show(response.message, 'success', 'Success')
  }
}
