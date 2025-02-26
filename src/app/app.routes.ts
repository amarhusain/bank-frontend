import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { APP_ROUTES } from './utils/constant';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { authGuard } from './security/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/' + APP_ROUTES.HOME, pathMatch: 'full' },  // Redirect to login by default
    { path: APP_ROUTES.HOME, component: HomePageComponent, canActivate: [authGuard] },
    { path: APP_ROUTES.LOGIN, component: LoginComponent },
    { path: APP_ROUTES.REGISTER, component: RegistrationPageComponent },
    { path: '**', component: PageNotFoundComponent }  // Wildcard route for a 404 page (optional)
];
