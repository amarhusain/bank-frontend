import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    // Inject the current `AuthService` and use it to get an authentication token:
    const userData = inject(AuthService).getUserData();
    // Clone the request to add the authentication header.
    if (userData && userData.token) {
        const newReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${userData.token}` // Adjust according to your token structure
            }
        });
        return next(newReq);
    }
    return next(req);
}