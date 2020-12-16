import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AddComment, CoreState, getCommentsEntitiesByNodeId, LoadReplies, UpdateCommentVote } from '@app/core/store';
import { Observable } from 'rxjs';
import { Comment } from '@app/core';
import { CommentsStore } from '@app/comments/containers/comments/comments.store';
import { BaseComponent } from '@app/shared/components/base-component';
import { takeUntil } from 'rxjs/operators';
import { IVote, VoteType } from '@app/core/models/vote.model';
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

  public comments$: Observable<Comment[]>;
  public VoteType = VoteType;

  constructor(private store: Store<CoreState>,
              private commentsStore: CommentsStore,
              private voteApiService: VoteApiService) {
    super();
  }

  ngOnInit() {
    this.comments$ = this.store.pipe(select(getCommentsEntitiesByNodeId(this.nodeId)));
    this.commentsStore.expandedCommentsAsObservable()
        .pipe(takeUntil(this.destroyed$))
        .subscribe((commentId: string) => this.store.dispatch(new LoadReplies(this.nodeId, commentId)));
  }

  onCommentAdded(comment: string) {
    this.store.dispatch(new AddComment(this.nodeId, comment));
  }

  onVote(comment: Comment, voteType: VoteType) {
    const newType = (comment.myVote && comment.myVote.vote === voteType) ? VoteType.ABSTAIN : voteType;
    const vote: IVote = {
      id: comment.myVote && comment.myVote.id,
      commentId: comment.id,
      vote: newType
    };
    this.store.dispatch(new UpdateCommentVote(this.nodeId, vote));
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
