import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { Observable } from 'rxjs';
import { DocumentConsolidate, DocumentConsultationData, DocumentNode, PageData, PageRequest, User } from '@app/core';
import { DocumentBreakdownStore } from './document-breakdown.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ec-document-breakdown',
  templateUrl: './document-breakdown.component.html',
  styleUrls: ['./document-breakdown.component.scss'],
  providers: [DocumentBreakdownStore]
})
export class DocumentBreakdownComponent implements OnInit {
  public document$: Observable<DocumentConsolidate> = this.store.pipe(select(fromStore.getDocumentConsolidate));
  public availableUsers$: Observable<User[]> = this.store.pipe(select(fromStore.getUsers));
  public usersPageData$: Observable<PageData> = this.store.pipe(select(fromStore.getUsersPageData));

  private documentMetadataId: string;

  constructor(private store: Store<CoreState>,
              private documentBreakdownStore: DocumentBreakdownStore,
              private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.documentMetadataId = this.route.snapshot.params['metadataId'];
    this.documentBreakdownStore.expandedNodes.subscribe((nodeId: string) => {
      this.store.dispatch(new fromStore.LoadComments(nodeId));
    });
  }

  public loadUsers() {
    this.store.dispatch(new fromStore.LoadUsers(new PageRequest(0, 5)));
  }

  public onAssignUsers(users: User[]) {
    const assignedUsersIds = users.map((user: User) => user.id);
    this.store.dispatch(new fromStore.SaveDocumentAssignedUsers(this.documentMetadataId, assignedUsersIds));
  }

  public onSaveDates(documentConsultationData: DocumentConsultationData) {
    this.store.dispatch(new fromStore.SaveDocumentConsultationData(this.documentMetadataId, documentConsultationData));
  }

  public onUsersPageChange(pageRequest: PageRequest) {
    pageRequest.size = 5;
    this.store.dispatch(new fromStore.LoadUsers(pageRequest));
  }

  public onUsersSearchTermChange(searchTerm: string) {
  }

  public onDocumentNodeUpdate(documentNode: DocumentNode) {
    this.store.dispatch(new fromStore.UpdateDocumentNode(documentNode));
  }
}
