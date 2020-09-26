import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreState } from '@app/core/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CommentsService } from '../../services';
import {
  CommentsActionTypes,
  LoadComments,
  LoadCommentsSuccess,
  LoadCommentsFail,
  AddComment,
  AddCommentFail,
  AddCommentSuccess,
  LoadPendingCommentsFail,
  LoadPendingCommentsSuccess,
  LoadPendingComments,
  ApprovePendingComment,
  ApprovePendingCommentFail,
  ApprovePendingCommentSuccess,
  RejectPendingComment,
  RejectPendingCommentFail,
  RejectPendingCommentSuccess
} from '../actions/comments.action';
import { IncrementDocumentNodeCommentCount } from '../actions/documents.action';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CommentsEffect {

  @Effect()
  loadComments$ = this.actions$.pipe(
      ofType(CommentsActionTypes.LoadComments),
      switchMap(
          (action: LoadComments) => this.commentsService.list(action.nodeId)
              .pipe(map((comments: any) => new LoadCommentsSuccess(action.nodeId, comments)))),
      catchError((commentsError: any) => of(new LoadCommentsFail(commentsError.nodeId, commentsError.response)))
  );

  @Effect()
  saveComment$ = this.actions$.pipe(
      ofType(CommentsActionTypes.AddComment),
      switchMap(
          (action: AddComment) => this.commentsService.save(action.nodeId, action.text)
              .pipe(map(comment => new AddCommentSuccess(action.nodeId, comment)))),
      catchError((commentsError: any) => of(new AddCommentFail(commentsError.nodeId, commentsError.response)))
  );

  @Effect()
  saveCommentSuccess$ = this.actions$.pipe(
      ofType(CommentsActionTypes.AddCommentSuccess),
      map((action: AddComment) => new IncrementDocumentNodeCommentCount(action.nodeId)),
  );

  @Effect()
  loadPendingComments$ = this.actions$.pipe(
      ofType(CommentsActionTypes.LoadPendingComments),
      switchMap(
          (action: LoadPendingComments) => this.commentsService.getAllPending(action.payload)
              .pipe(map(comments => new LoadPendingCommentsSuccess(comments)))),
      catchError(commentsError => of(new LoadPendingCommentsFail(commentsError.response)))
  );

  @Effect()
  approvePendingComment$ = this.actions$.pipe(
      ofType(CommentsActionTypes.ApprovePendingComment),
      concatMap(
          (action: ApprovePendingComment) => this.commentsService.approvePendingComment(action.commentId)
              .pipe(map(comment => new ApprovePendingCommentSuccess(comment)))
      ),
      catchError(error => of(new ApprovePendingCommentFail(error.response)))
  );

  @Effect()
  rejectPendingComment$ = this.actions$.pipe(
      ofType(CommentsActionTypes.RejectPendingComment),
      concatMap(
          (action: RejectPendingComment) => this.commentsService.rejectPendingComment(action.commentId)
              .pipe(map(comment => new RejectPendingCommentSuccess(comment)))
      ),
      catchError(error => of(new RejectPendingCommentFail(error.response)))
  );

  constructor(private store$: Store<CoreState>,
              private actions$: Actions,
              private commentsService: CommentsService) {
  }
}
