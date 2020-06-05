import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { Observable } from 'rxjs';
import { DocumentConsolidate } from '@app/core';

@Component({
  selector: 'app-document-breakdown',
  templateUrl: './document-breakdown.component.html',
  styleUrls: ['./document-breakdown.component.scss']
})
export class DocumentBreakdownComponent {
  public document$: Observable<DocumentConsolidate> = this.store.select(fromStore.getDocumentConsolidate);
  public addCommentModeForNode: Map<string, boolean> = new Map();

  constructor(private store: Store<CoreState>) {
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
