import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ec-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {
  @Input() text: string;
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
}
