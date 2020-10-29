import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CoreState } from '@app/core/store';
import { Observable } from 'rxjs';
import { Comment, PageData, PageRequest } from '@app/core';
import * as fromStore from '@app/core/store';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  public pendingComments$: Observable<Comment[]> = this.store.pipe(select(fromStore.getPendingComments));
  public pendingCommentsLoading$: Observable<boolean> = this.store.pipe(select(fromStore.getPendingCommentsLoading));
  public pendingCommentsPageData$: Observable<PageData> = this.store.pipe(select(fromStore.getPendingCommentsPageData));

  constructor(private store: Store<CoreState>) {
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadPendingComments(new PageRequest()));
  }

  public onPendingCommentsPageChanged(pageRequest: PageRequest) {
    this.store.dispatch(new fromStore.LoadPendingComments(pageRequest));
  }

  public onPendingCommentApproved(comment: Comment) {
    this.store.dispatch(new fromStore.ApprovePendingComment(comment.id));
  }

  public onPendingCommentRejected(comment: Comment) {
    this.store.dispatch(new fromStore.RejectPendingComment(comment.id));
  }
}
