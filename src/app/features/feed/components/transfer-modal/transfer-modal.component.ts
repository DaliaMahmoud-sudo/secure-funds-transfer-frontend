import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transfer-modal',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './transfer-modal.component.html'
})
export class TransferModalComponent {

  @Input() showModal!: boolean;
  @Input() transferForm!: FormGroup;
  @Input() isTransferring!: boolean;

  @Output() close = new EventEmitter<void>();
  @Output() submitTransfer = new EventEmitter<void>();

}
