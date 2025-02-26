import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { mfInterceptorProvider } from './http-interceptors/mf-interceptor-provider';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GlobalErrorHandler } from './common/handlers/global-error.handler';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    /** DI-based interceptor */
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    provideAnimations(),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    mfInterceptorProvider
  ]
};
