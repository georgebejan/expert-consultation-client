import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base-component';
import { DocumentConsolidate, DocumentConsultationData, DocumentMetadata, DocumentNode, PageData, PageRequest, User } from '@app/core';
import { DocumentUsersModalComponent } from '@app/documents/components/document-users-modal/document-users-modal.component';
import { DocumentNodeEditModalComponent } from '@app/documents/components/document-node-edit-modal/document-node-edit-modal.component';
import { DocumentDeadlineModalComponent } from '@app/documents/components/document-deadline-modal/document-deadline-modal.component';
import { DocumentConfiguration } from '@app/core/models/document-configuration.model';


@Component({
  selector: 'ec-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent extends BaseComponent implements OnInit, OnChanges {
  @ViewChild('assignUsersModal', {static: true}) public assignUsersModal: DocumentUsersModalComponent;
  @ViewChild('editNodeModal', {static: true}) public editNodeModal: DocumentNodeEditModalComponent;
  @ViewChild('deadlineModal', {static: true}) public deadlineModal: DocumentDeadlineModalComponent;

  @Input() public document: DocumentConsolidate;
  @Input() public availableUsers: User[];
  @Input() public usersPageData: PageData;
  @Output() public assignedUsersModalOpen: EventEmitter<void> = new EventEmitter<void>();
  @Output() public assignUsers: EventEmitter<User[]> = new EventEmitter<User[]>();
  @Output() public saveDates: EventEmitter<DocumentConsultationData> = new EventEmitter<DocumentConsultationData>();
  @Output() public usersPageChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();
  @Output() public usersSearchTermChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() public documentNodeUpdate: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();

  public documentNode: DocumentNode;
  public documentMetadata: DocumentMetadata;
  public isEditMode = false;

  public ngOnInit(): void {
    this.documentMetadata = this.document.documentMetadata;
    this.documentNode = this.document.documentNode;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['document']) {
      this.documentNode = this.document.documentNode;
    }
  }

  public openAssignUsersModal() {
    this.assignedUsersModalOpen.emit();
    this.assignUsersModal.open();
  }

  public openDeadlineModal() {
    this.deadlineModal.open();
  }

  public enableEditMode() {
    this.isEditMode = true;
  }

  public disableEditMode() {
    this.isEditMode = false;
  }

  public onNodeEditButtonClick(node: DocumentNode) {
    this.editNodeModal.open(node);
  }
}
