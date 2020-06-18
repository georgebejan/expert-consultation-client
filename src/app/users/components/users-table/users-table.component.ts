import { Component, Input } from '@angular/core';
import { User } from '@app/core';

@Component({
  selector: 'ec-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input() public users: User[];
}
