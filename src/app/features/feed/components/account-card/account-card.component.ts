import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account-card',
  standalone: true,
  templateUrl: './account-card.component.html'
})
export class AccountCardComponent {

  @Input() accountNumber!: string;
  @Input() balance!: number;

  @Output() sendMoney = new EventEmitter<void>();

}
