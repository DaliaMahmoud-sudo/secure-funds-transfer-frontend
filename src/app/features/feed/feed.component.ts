import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TransferService } from '../../core/auth/services/transfer/transfer.service';
import { AccServiceService } from '../../core/auth/services/account/acc-service.service';
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { Account } from '../../core/models/account.interface';
import { Transaction } from '../../core/models/transaction.interface';




@Component({
  selector: 'app-feed',
  imports: [ReactiveFormsModule, RouterLink, NgClass,DatePipe],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})



export class FeedComponent implements OnInit {

  account: Account = {
    user: { id: 0, username: '', password: '' },
    accountNumber: '',
    balance: 0
  };
  transactions: Transaction[] = [];

  showModal = false;
  isTransferring = false;

  // loading screen state
  isLoading = true;

  transferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private transferService: TransferService,
    private accService: AccServiceService,
    private cd: ChangeDetectorRef
  ) {
    this.transferForm = this.fb.group({
      recipientAccountNumber: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]]
    });
  }


  ngOnInit(): void {
    this.loadAccountData();
    this.loadTransactions();

  }

  loadTransactions(): void {

    this.transferService.transaction().subscribe({

      next: (data: any) => {

        this.transactions = data;

        console.log("Transactions:", this.transactions);

        this.cd.detectChanges();

      },

      error: (err) => {

        console.error("Error loading transactions", err);

      }

    });

  }


  loadAccountData(): void {

    this.isLoading = true;

    this.accService.getAcc().subscribe({

      next: (data: any) => {

        this.account = { ...data };


        console.log("API response:", this.account);

        this.cd.detectChanges();

        this.isLoading = false;
      },

      error: (err) => {

        console.error('Session expired or invalid', err);

        this.isLoading = false;

        this.logout();
      }
    });
  }

  handleTransfer(): void {

    if (this.transferForm.invalid) return;
    const amount = this.transferForm.value.amount;

    if (amount > this.account.balance) {

      alert("❌ Insufficient balance!");

      return;
    }

    this.isTransferring = true;

    this.transferService.transfer(this.transferForm.value)
      .subscribe({

        next: () => {

          // refresh account balance immediately





          this.isTransferring = false;

          this.transferForm.reset();

          this.showModal = false;

          this.loadAccountData();
          this.loadTransactions();

          setTimeout(() => {
            alert('Transfer Successful!');
          }, 0);
          this.cd.detectChanges();


        },

        error: (err) => {

          console.error(err);

          this.isTransferring = false;

          alert(err?.error || 'Transfer Failed');

        }

      });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
