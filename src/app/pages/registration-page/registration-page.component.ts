import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { APP_ROUTES } from '../../utils/constant';
// import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { SuccessHandlingService } from '../../services/success-handling.service';
import { ApiResponse } from '../../models/toast.model';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  // imports: [CommonModule, ReactiveFormsModule, RouterLink, RecaptchaModule, RecaptchaFormsModule],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {

  registerForm!: FormGroup;

  passwordStrength = 0;
  passwordStrengthText = '';
  passwordStrengthColor = '';
  showPwdStrengthBar: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private successHandlingService: SuccessHandlingService) {
    this.initializeForm();
  }

  ngOnInit(): void {
    // Subscribe to value changes for email and password inputs
    this.registerForm.get('email')?.valueChanges.subscribe(value => {
      this.validateEmail(value);
    });

    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.validatePassword(value);
    });
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // Validation for email field
  validateEmail(email: string): void {
    const emailControl = this.registerForm.get('email');
    if (emailControl?.hasError('required')) {
      console.log('Email is required');
    } else if (emailControl?.hasError('email')) {
      console.log('Please enter a valid email');
    }
  }

  validatePassword(password: string) {
    if (password.length > 0) {
      this.showPwdStrengthBar = true;
    } else {
      this.showPwdStrengthBar = false
    }
    let strength = 0;
    if (password.match(/[a-z]+/)) strength += 20;
    if (password.match(/[A-Z]+/)) strength += 20;
    if (password.match(/[0-9]+/)) strength += 20;
    if (password.match(/[$@#&!]+/)) strength += 20;
    if (password.length >= 8) strength += 20;

    this.passwordStrength = strength;

    if (strength < 40) {
      this.passwordStrengthText = 'Weak';
      this.passwordStrengthColor = 'red';
    } else if (strength < 80) {
      this.passwordStrengthText = 'Medium';
      this.passwordStrengthColor = 'orange';
    } else {
      this.passwordStrengthText = 'Strong';
      this.passwordStrengthColor = 'green';
    }
  }


  onSubmit() {

    if (this.registerForm.valid) {
      // Extract email and password from the form
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;

      this.authService.register(email, password).subscribe({
        next: (response: ApiResponse) => {
          console.log('Login successful', response);
          this.successHandlingService.handleSearchSuccess(response);
          this.router.navigateByUrl(APP_ROUTES.LOGIN);
        },
        error: (err: any) => console.error('Login failed', err)
      });
    } else {
      console.error('Form is invalid');
      // Optionally display form validation errors
    }


  }


}
