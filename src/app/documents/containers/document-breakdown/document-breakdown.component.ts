import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { Observable } from 'rxjs';
import { DocumentConsolidate } from '@app/core';
import { DocumentBreakdownStore } from './document-breakdown.store';

@Component({
  selector: 'app-document-breakdown',
  templateUrl: './document-breakdown.component.html',
  styleUrls: ['./document-breakdown.component.scss'],
  providers: [DocumentBreakdownStore]
})
export class DocumentBreakdownComponent implements OnInit {
  public document$: Observable<DocumentConsolidate> = this.store.select(fromStore.getDocumentConsolidate);
  public addCommentModeForNode: Map<string, boolean> = new Map();

  constructor(private store: Store<CoreState>,
              private documentBreakdownStore: DocumentBreakdownStore) {
  }

  ngOnInit() {
    this.documentBreakdownStore.expandedNodes.subscribe((nodeId: string) => {
      this.store.dispatch(new fromStore.LoadComments(nodeId));
    });
  }

  addComment(nodeId) {
    if (this.addCommentModeForNode.has(nodeId)) {
      this.addCommentModeForNode.set(nodeId, !this.addCommentModeForNode.get(nodeId));
    } else {
      this.addCommentModeForNode.set(nodeId, true);
    }
    if (this.addCommentModeForNode.get(nodeId)) {
      this.store.dispatch(new fromStore.LoadComments(nodeId));
    }
  }
}
