import { Injectable } from '@angular/core';
import { CommentsApiService } from '../http';
import { Observable } from 'rxjs';
import { Comment, IComment, Page, PageRequest } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class CommentsService {
  constructor(private commentsApiService: CommentsApiService) {
  }

  public list(nodeId: string): Observable<Page<Comment>> {
    return this.commentsApiService.list(nodeId)
        .pipe(map(value => this.mapPage(value)));
  }

  public save(nodeId: string, text: string): Observable<Comment> {
    return this.commentsApiService.save(nodeId, text)
        .pipe(map((iComment: IComment) => new Comment(iComment)));
  }

  public listReplies(nodeId: string, commentId: string): Observable<Page<Comment>> {
    return this.commentsApiService.listReplies(nodeId, commentId).pipe(map(value => this.mapPage(value)));
  }

  public saveReply(nodeId: string, commentId: string, text: string): Observable<Comment> {
    return this.commentsApiService.saveReply(nodeId, commentId, text).pipe(map((iComment: IComment) => new Comment(iComment)));
  }

  public getAllPending(pageRequest: PageRequest): Observable<Page<Comment>> {
    return this.commentsApiService.getAllPending(pageRequest).pipe(map(value => this.mapPage(value)));
  }

  public approvePendingComment(commentId: string): Observable<Comment> {
    return this.commentsApiService.approvePendingComment(commentId).pipe(map((iComment: IComment) => new Comment(iComment)));
  }

  public rejectPendingComment(commentId: string): Observable<Comment> {
    return this.commentsApiService.rejectPendingComment(commentId).pipe(map((iComment: IComment) => new Comment(iComment)));
  }

  private mapPage(page: Page<IComment>): Page<Comment> {
    const result = new Page<Comment>(page);
    result.content = page.content.map(this.fromResponse);
    return result;
  }

  private fromResponse(commentResponse: IComment): Comment {
    return new Comment(commentResponse);
  }

}
