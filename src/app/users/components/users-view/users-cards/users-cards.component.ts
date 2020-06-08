import { Component, Input } from '@angular/core';
import { PageData, User } from '@app/core';

@Component({
  selector: 'app-users-cards',
  templateUrl: './users-cards.component.html',
  styleUrls: ['./users-cards.component.scss']
})
export class UsersCardsComponent {
  @Input() public users: User[];
  @Input() public pageData: PageData;
  @Input() public loading: boolean;
}
