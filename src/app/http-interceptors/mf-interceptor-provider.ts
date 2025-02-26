import { Provider } from '@angular/core';

// Injection token for the Http Interceptors multi-provider
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './loader.interceptor';
import { MfInterceptor } from './mf-interceptor';

/** Provider for the Noop Interceptor. */
export const mfInterceptorProvider: Provider =
    [{ provide: HTTP_INTERCEPTORS, useClass: MfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
    ];