import { Component, Input } from '@angular/core';
import { Transaction } from '../../../../core/models/transaction.interface';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-transaction-history',
  imports: [NgClass,DatePipe],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css',
})
export class TransactionHistoryComponent {
  @Input() transactions: Transaction[] = [];

}
