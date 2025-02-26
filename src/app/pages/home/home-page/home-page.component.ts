import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  balance: number = 0;
  accountNumber = '1111';
  amount = 0;
  message = '';

  debitForm!: FormGroup;
  creditForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private accountService: AccountService) {
      this.initializeForm();
    }

  private initializeForm(): void {
    this.creditForm = this.fb.group({
      creditAmount: ['', [Validators.required,  Validators.pattern('^[0-9]*\.?[0-9]+$')]],
    });

    this.debitForm = this.fb.group({
      debitAmount: ['', [Validators.required,  Validators.pattern('^[0-9]*\.?[0-9]+$')]],
    });
  }

  ngOnInit() {
    this.getBalance();
  }

  getBalance() {
    this.accountService.getBalance(this.accountNumber).subscribe((res) => {
      this.balance = res.data;
    });
  }

  credit() {
    if (this.creditForm.invalid) {
      this.message = 'Please enter a valid credit amount!';
      return;
    }

    let amount = this.creditForm.value.creditAmount;
    this.accountService.credit(this.accountNumber, amount).subscribe({
      next: () => {
        this.message = `Credited $ ${amount} successfully!`;
        this.getBalance();
        this.creditForm.reset();
      },
      error: () => {
        this.message = `Credit failed!`;
      }
    });
  }

  debit() {
    if (this.debitForm.invalid) {
      this.message = 'Please enter a valid debit amount!';
      return;
    }

    let amount = this.debitForm.value.debitAmount;
    this.accountService.debit(this.accountNumber, amount).subscribe({
      next: () => {
        this.message = `Debited $ ${amount} successfully!`;
        this.getBalance();
        this.debitForm.reset();
      },
      error: () => {
        this.message = `Debit failed!`;
      }
    });
  }

}
