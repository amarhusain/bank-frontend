import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APP_ROUTES } from '../utils/constant';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(
    private toastService: ToastService,
    private routerService: Router,
    private authService: AuthService
  ) {
  }


  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    }
  }

  private handleHttpError(error: HttpErrorResponse): void {
    let errorMessage = '';
    let title = '';

    switch (error.status) {
      case 400:
        title = 'Invalid Request';
        errorMessage = this.extractErrorMessage(error) || 'Please check your input and try again.';
        break;
      case 401:
        title = 'Session Expired';
        errorMessage = 'Your session has expired. Please login again.';
        // Optionally redirect to login page or refresh token
        // Clear any stored authentication tokens
        this.authService.logout();
        // Redirect to login page
        this.routerService.navigate([APP_ROUTES.LOGIN]);
        break;
      case 403:
        title = 'Access Denied';
        errorMessage = 'You don\'t have permission to perform this action.';
        break;
      case 404:
        title = 'Not Found';
        errorMessage = 'The requested resource was not found.';
        break;
      case 429:
        title = 'Too Many Requests';
        errorMessage = 'Please wait a moment before trying again.';
        break;
      case 500:
        title = 'Server Error';
        errorMessage = this.extractErrorMessage(error) || 'An unexpected server error occurred. Please try again later.';
        break;
      case 503:
        title = 'Service Unavailable';
        errorMessage = 'The service is temporarily unavailable. Please try again later.';
        break;
      default:
        title = 'Error';
        errorMessage = 'An unexpected error occurred. Please try again.';
    }

    this.toastService.show(errorMessage, 'error', title);


  }


  private extractErrorMessage(error: HttpErrorResponse): string {
    try {
      if (error.error?.errorMessage) {
        return error.error.errorMessage;
      }
      if (error.error?.error?.message) {
        return error.error.error.message;
      }
      if (typeof error.error === 'string') {
        return error.error;
      }
      return error.message;
    } catch {
      return 'An unexpected error occurred';
    }
  }

}
