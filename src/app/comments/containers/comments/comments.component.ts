import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { Observable } from 'rxjs';
import { Comment } from '@app/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() public nodeId: string;
  @Output() public commentsCollapsed: EventEmitter<void> = new EventEmitter<void>();

  public comments$: Observable<Comment[]>;

  constructor(private store: Store<CoreState>) {
  }

  ngOnInit() {
    this.comments$ = this.store.pipe(select(fromStore.getCommentsEntitiesByNodeId(this.nodeId)));
  }

  onCommentAdded(comment: string) {
    this.store.dispatch(new fromStore.AddComment(this.nodeId, comment));
  }
}
