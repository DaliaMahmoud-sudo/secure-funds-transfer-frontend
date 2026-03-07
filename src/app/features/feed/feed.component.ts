import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TransferService } from '../../core/auth/services/transfer/transfer.service';
import { AccServiceService } from '../../core/auth/services/account/acc-service.service';

@Component({
  selector: 'app-feed',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {

  username: string = '';
  accountNumber: string = '';
  balance: number = 0;

  showModal = false;
  isTransferring = false;

  // loading screen state
  isLoading = true;

  transferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private transferService: TransferService,
    private accService: AccServiceService
  ) {
    this.transferForm = this.fb.group({
      recipientAccountNumber: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]]
    });
  }


  ngOnInit(): void {
 this.loadAccountData();

  }

  loadAccountData() {
 console.log("Loading account data...");

    this.accService.getAcc().subscribe({
      next: (data: any) => {
         console.log("API response:", data);
           this.username = data.user.username;
this.accountNumber = data.accountNumber;
  this.balance = data.balance;

      },

      error: (err) => {

        console.error('Session expired or invalid', err);



        this.logout();
      }
    });
  }

  handleTransfer() {

    if (this.transferForm.invalid) return;

    this.isTransferring = true;

    this.transferService.transfer(this.transferForm.value)
      .subscribe({

        next: () => {

          // refresh account balance immediately




          this.isTransferring = false;

           this.transferForm.reset();

          this.showModal = false;
          this.loadAccountData();

          alert('Transfer Successful!');

        },

        error: (err) => {

          console.error(err);

          this.isTransferring = false;

          alert(err?.error || 'Transfer Failed');

        }

      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
