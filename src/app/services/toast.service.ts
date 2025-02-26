import { Injectable, signal } from '@angular/core';
import { Toast, ToastType } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private readonly MAX_TOASTS = 3;
  toasts = signal<Toast[]>([]);

  show(message: string, type: ToastType = 'info', title?: string): void {
    const toast: Toast = {
      id: Date.now(),
      message,
      type,
      title,
      timestamp: new Date()
    };

    this.toasts.update(current => {
      const updated = [toast, ...current];
      return updated.slice(0, this.MAX_TOASTS);
    });

    // Auto dismiss after timeout
    setTimeout(() => this.dismiss(toast.id), type === 'error' ? 5000 : 3000);
  }

  dismiss(id: number): void {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }

}
