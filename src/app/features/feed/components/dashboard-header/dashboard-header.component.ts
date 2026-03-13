import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  templateUrl: './dashboard-header.component.html'
})
export class DashboardHeaderComponent {

  @Input() username!: string;

  @Output() logout = new EventEmitter<void>();
}
