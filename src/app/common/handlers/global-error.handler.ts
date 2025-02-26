
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ErrorHandlingService } from '../../services/error-handling.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private errorHandlingService = inject(ErrorHandlingService);

  handleError(error: Error): void {
    this.errorHandlingService.handleError(error);
  }
}