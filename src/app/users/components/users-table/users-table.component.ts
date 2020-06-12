import { Component, Input } from '@angular/core';
import { PageData, User } from '@app/core';
import { BaseComponent } from '@app/shared/components/base-component';

@Component({
  selector: 'ec-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent extends BaseComponent {
  @Input() public users: User[];
  @Input() public pageData: PageData;
  @Input() public loading: boolean;
}
