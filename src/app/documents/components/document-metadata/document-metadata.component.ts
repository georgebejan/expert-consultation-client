import { Component, Input } from '@angular/core';
import { DocumentMetadata, User } from '@app/core';

@Component({
  selector: 'ec-document-metadata',
  templateUrl: './document-metadata.component.html',
  styleUrls: ['./document-metadata.component.scss']
})
export class DocumentMetadataComponent {
  @Input() public metadata: DocumentMetadata;
  @Input() public assignedUsers: User[];

  public getAssignedUsersListAsString() {
    return this.assignedUsers.map(this.formatName).join(', ');
  }

  private formatName(user: User) {
    return `${user.lastName} ${user.firstName}`;
  }
}
