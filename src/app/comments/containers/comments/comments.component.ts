import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AddComment, CoreState, getCommentsEntitiesByNodeId, LoadReplies } from '@app/core/store';
import { Observable } from 'rxjs';
import { IComment } from '@app/core';
import { CommentsStore } from '@app/comments/containers/comments/comments.store';
import { BaseComponent } from '@app/shared/components/base-component';
import { takeUntil, tap } from 'rxjs/operators';
import { IVote, VoteType } from '@app/core/models/IVote';
import { VoteApiService } from '@app/core/http/vote-api.service';

@Component({
  selector: 'ec-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentsStore],
})
export class CommentsComponent extends BaseComponent implements OnInit {
  @Input() public nodeId: string;
  @Output() public commentsCollapsed: EventEmitter<void> = new EventEmitter<void>();

  public comments$: Observable<IComment[]>;
  public votesByCommentIds$: { [commentId: string]: Observable<IVote[]> } = {};
  public VoteType = VoteType;

  constructor(private store: Store<CoreState>,
              private commentsStore: CommentsStore,
              private voteApiService: VoteApiService) {
    super();
  }

  ngOnInit() {
    this.comments$ = this.store.pipe(select(getCommentsEntitiesByNodeId(this.nodeId)))
        .pipe(tap(comments => comments.map(comment => {
          if (!this.votesByCommentIds$[comment.id]) {
            this.votesByCommentIds$[comment.id] = this.voteApiService.getVotes(comment.id);
          }
        })));
    this.commentsStore.expandedCommentsAsObservable()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((commentId: string) => this.store.dispatch(new LoadReplies(this.nodeId, commentId)));
  }

  onCommentAdded(comment: string) {
    this.store.dispatch(new AddComment(this.nodeId, comment));
  }

  onVote(commentId: string, type: VoteType) {
    this.voteApiService.createVote(commentId, type).subscribe();
  }

  areRepliesExpanded(commentId: string) {
    return this.commentsStore.isExpanded(commentId);
  }

  onRepliesCollapsed(commentId: string) {
    this.commentsStore.collapse(commentId);
    document.getElementById(commentId).scrollIntoView({behavior: 'smooth'});
  }

  expandReplies(commentId: string) {
    if (!this.commentsStore.isExpanded(commentId)) {
      this.commentsStore.expand(commentId);
    }
  }
}
