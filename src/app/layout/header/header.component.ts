import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserData } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { APP_ROUTES } from '../../utils/constant';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  ROUTES = APP_ROUTES;
  userData: UserData | null = null;
  private userSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.userData = user ? user : null;
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Check login status
  }

  navigateToProfile(event: Event): void {
    event.preventDefault(); // Prevent default anchor behavior
    if (this.userData) {
      this.router.navigate(['/user/profile/', this.userData?.id]);
    }
  }


  onLogout(): void {
    this.authService.logout(); // Call the logout method
    // Optionally, you may want to redirect to the login page
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
