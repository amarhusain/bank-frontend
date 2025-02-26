import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ErrorHandlingService } from '../services/error-handling.service';

@Injectable()
export class MfInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private errorHandlingService: ErrorHandlingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get user data from localStorage
    const userData = this.authService.getUserData();
    if (userData && userData.token) {  // Assuming the token is stored in userData
      // Clone the request and set the new header
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userData.token}` // Adjust according to your token structure
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandlingService.handleError(error);
        return throwError(() => error);
      })
    );
  }

 
}