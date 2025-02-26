// @core/models/toast.model.ts
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  title?: string;
  timestamp: Date;
}

export interface ApiResponse {
  message: string;
  data: any;
}