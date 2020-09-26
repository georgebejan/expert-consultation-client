import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment, PageData, PageRequest } from '@app/core';

@Component({
  selector: 'ec-pending-comments',
  templateUrl: './pending-comments-list.component.html',
  styleUrls: ['./pending-comments-list.component.scss'],
})

export class PendingCommentsListComponent {
  @Input() public comments: Comment[];
  @Input() public isLoading: boolean;
  @Input() public pageData: PageData;
  @Output() public commentApproved: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() public commentRejected: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() public pageChanged: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();

  public onPageChange(pageRequest: PageRequest) {
    this.pageChanged.emit(pageRequest);
  }

  public approve(comment: Comment) {
    this.commentApproved.emit(comment);
  }

  public reject(comment: Comment) {
    this.commentRejected.emit(comment);
  }

  public hasPendingComments() {
    return this.comments && this.comments.length > 0;
  }
}
