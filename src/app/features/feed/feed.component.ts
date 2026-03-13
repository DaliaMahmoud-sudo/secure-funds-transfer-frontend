import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../../core/models/account.interface';
import { Transaction } from '../../core/models/transaction.interface';
import { AccountCardComponent } from "./components/account-card/account-card.component";
import { DashboardHeaderComponent } from "./components/dashboard-header/dashboard-header.component";
import { TransactionHistoryComponent } from "./components/transaction-history/transaction-history.component";
import { TransferModalComponent } from "./components/transfer-modal/transfer-modal.component";
import { TransferService } from '../../core/services/transfer/transfer.service';
import { AccServiceService } from '../../core/services/account/acc-service.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  imports: [AccountCardComponent, DashboardHeaderComponent, TransactionHistoryComponent, TransferModalComponent]
})
export class FeedComponent implements OnInit {

  account!: Account;
  transactions: Transaction[] = [];

  showModal = false;
  isLoading = true;
  isTransferring = false;

  transferForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private transferService: TransferService,
    private accService: AccServiceService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadAccountData();
    this.loadTransactions();
  }

  initForm() {
    this.transferForm = this.fb.group({
      recipientAccountNumber: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]]
    });
  }

  loadAccountData() {

    this.accService.getAcc().subscribe({
      next: (data:any) => {
        this.account = data;
        this.cd.detectChanges();
        this.isLoading = false;


      },
      error: () => {
        this.logout();
      }
    });

  }

  loadTransactions() {

    this.transferService.transaction().subscribe({
      next: (data:any) => {
        this.transactions = data;
        this.cd.detectChanges();
      }
    });

  }

  handleTransfer() {

    if (this.transferForm.invalid) return;

    const amount = this.transferForm.value.amount;

    if (amount > this.account.balance) {
      alert("Insufficient balance");
      return;
    }

    this.isTransferring = true;

    this.transferService.transfer(this.transferForm.value).subscribe({

      next: () => {

        this.transferForm.reset();
        this.showModal = false;
        this.isTransferring = false;


        this.loadAccountData();
        this.loadTransactions();
        this.cd.detectChanges();

        alert("Transfer Successful!");


      },

      error: (err) => {

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
