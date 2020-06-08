import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageData, User } from '@app/core';

@Component({
  selector: 'app-document-users-table',
  templateUrl: './document-users-table.component.html',
  styleUrls: ['./document-users-table.component.scss']
})
export class DocumentUsersTableComponent {
  @Input() public availableUsers: User[];
  @Input() public assignedUsers: User[];
  @Input() public pageData: PageData;
  @Output() public userAssigned: EventEmitter<User> = new EventEmitter<User>();
  @Output() public userUnassigned: EventEmitter<User> = new EventEmitter<User>();

  public isAssigned(userId: string) {
    return this.assignedUsers && this.assignedUsers.find(assignedUser => userId === assignedUser.id);
  }

  public onToggleUser(isChecked: boolean, user: User) {
    if (isChecked) {
      this.userAssigned.emit(user);
    } else {
      this.userUnassigned.emit(user);
    }
  }
}
