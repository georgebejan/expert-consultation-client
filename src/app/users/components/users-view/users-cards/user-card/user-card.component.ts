import { Component, Input } from '@angular/core';
import { User } from '@app/core';

@Component({
  selector: 'ec-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user: User;
}
