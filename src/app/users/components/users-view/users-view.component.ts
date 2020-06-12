import { Component, Input } from '@angular/core';
import { PageData, User } from '@app/core';

@Component({
  selector: 'ec-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersViewComponent {
  @Input() public users: User[];
  @Input() public pageData: PageData;
  @Input() public loading: boolean;
  @Input() public activeView: string;
}
