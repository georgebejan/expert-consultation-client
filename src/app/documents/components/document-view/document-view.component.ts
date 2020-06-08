import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base-component';
import { DocumentConsolidate, DocumentMetadata, DocumentNode, PageData, PageRequest, User } from '@app/core';
import { DocumentUsersModalComponent } from '@app/documents/components/document-users-modal/document-users-modal.component';


@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent extends BaseComponent implements OnInit {
  @ViewChild('assignUsersModal', {static: true}) public assignUsersModal: DocumentUsersModalComponent;

  @Input() public document: DocumentConsolidate;
  @Input() public availableUsers: User[];
  @Input() public usersPageData: PageData;
  @Output() public assignedUsersModalOpen: EventEmitter<void> = new EventEmitter<void>();
  @Output() public assignUsers: EventEmitter<User[]> = new EventEmitter<User[]>();
  @Output() public usersPageChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();
  @Output() public usersSearchTermChange: EventEmitter<string> = new EventEmitter<string>();

  public documentNode: DocumentNode;
  public documentMetadata: DocumentMetadata;

  public ngOnInit(): void {
    this.documentMetadata = this.document.documentMetadata;
    this.documentNode = this.document.documentNode;
  }

  public openAssignUsersModal() {
    this.assignedUsersModalOpen.emit();
    this.assignUsersModal.open();
  }
}
