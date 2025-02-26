import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { ToastComponent } from './common/components/toast.component';
import { LoaderComponent } from './common/components/loader.component';
import { LoaderService } from './services/loader.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    FooterComponent, 
    HeaderComponent, 
    ToastComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bank-app';
  today = new Date();

  loading$ = this.loaderService.loading$;

  constructor(
    private loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit() {
    // Hide loader after initial load
    window.onload = () => {
      this.loaderService.hide();
    };

    // Show loader on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loaderService.hide();
    });
  }

}
