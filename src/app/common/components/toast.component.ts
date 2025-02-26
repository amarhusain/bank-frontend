import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
   <div class="toast-container">
      @for (toast of toasts(); track toast.id) {
        <div 
          class="toast-item"
          [ngClass]="toast.type"
          [@toastAnimation]>
          <div class="toast-header">
            <strong>{{ toast.title }}</strong>
            <button class="close-btn" (click)="dismiss(toast.id)">×</button>
          </div>
          <div class="toast-body">{{ toast.message }}</div>
          <div class="toast-progress"></div>
        </div>
      }
    </div>
`,
  styles: [`
  .toast-container {
      position: fixed;
      top: 20px;  /* Distance from top */
      right: 20px;
      z-index: 9999; /* Ensure it's above other content */
      max-width: 350px;
      pointer-events: none;
    }
  
    .toast-item {
      pointer-events: auto;
      margin-bottom: 10px;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      background: white;
      transition: all 0.3s ease;
      opacity: 1;
      position: relative;
      overflow: hidden;
      min-width: 400px;
    }

    .toast-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      padding: 0 4px;
      line-height: 1;
    }

    .toast-body {
      font-size: 14px;
      line-height: 1.4;
    }

    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.7);
      animation: progress 3s linear forwards;
    }

    .error {
      background-color: #dc3545;
      color: white;
    }

    .success {
      background-color: #28a745;
      color: white;
    }

    .warning {
      background-color: #ffc107;
      color: black;
    }

    .info {
      background-color: #17a2b8;
      color: white;
    }

    @keyframes progress {
      from { width: 100%; }
      to { width: 0%; }
    }
`],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
