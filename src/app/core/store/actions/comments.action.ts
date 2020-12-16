import { Action } from '@ngrx/store';
import { Comment, Page, PageRequest } from '../../models';
import { IVote, IVoteCount } from '@app/core/models/vote.model';

export enum CommentsActionTypes {
  LoadComments = '[Comments] Load Comments',
  LoadCommentsSuccess = '[Comments] Load Comments Success',
  LoadCommentsFail = '[Comments] Load Comments Fail',
  LoadPendingComments = '[Comments] Load Pending Comments',
  LoadPendingCommentsSuccess = '[Comments] Load Pending Comments Success',
  LoadPendingCommentsFail = '[Comments] Load Pending Comments Fail',
  ApprovePendingComment = '[Comments] Approve pending comment',
  ApprovePendingCommentSuccess = '[Comments] Approve pending comment success',
  ApprovePendingCommentFail = '[Comments] Approve pending comment fail',
  RejectPendingComment = '[Comments] Reject pending comment',
  RejectPendingCommentSuccess = '[Comments] Reject pending comment success',
  RejectPendingCommentFail = '[Comments] Reject pending comment fail',
  AddComment = '[Comments] Add comment',
  AddCommentSuccess = '[Comments] Add comment success',
  AddCommentFail = '[Comments] Add comment fail',
  UpdateCommentVote = '[Comments] Update comment vote',
  UpdateCommentVoteCountSuccess = '[Comments] Update comment vote count success',
}

export class LoadComments implements Action {
  readonly type = CommentsActionTypes.LoadComments;

  constructor(public nodeId: string) {
  }
}

export class LoadCommentsSuccess implements Action {
  readonly type = CommentsActionTypes.LoadCommentsSuccess;

  constructor(public nodeId: string, public commentsPage: Page<Comment>) {
  }
}

export class LoadCommentsFail implements Action {
  readonly type = CommentsActionTypes.LoadCommentsFail;

  constructor(public nodeId: string, public error: any) {
  }
}

export class LoadPendingComments implements Action {
  readonly type = CommentsActionTypes.LoadPendingComments;

  constructor(public payload: PageRequest) {
  }
}

export class LoadPendingCommentsSuccess implements Action {
  readonly type = CommentsActionTypes.LoadPendingCommentsSuccess;

  constructor(public commentsPage: Page<Comment>) {
  }
}

export class LoadPendingCommentsFail implements Action {
  readonly type = CommentsActionTypes.LoadPendingCommentsFail;

  constructor(public error: any) {
  }
}

export class AddComment implements Action {
  readonly type = CommentsActionTypes.AddComment;

  constructor(public nodeId: string, public text: string) {
  }
}

export class AddCommentSuccess implements Action {
  readonly type = CommentsActionTypes.AddCommentSuccess;

  constructor(public nodeId: string, public comment: Comment) {
  }
}

export class AddCommentFail implements Action {
  readonly type = CommentsActionTypes.AddCommentFail;

  constructor(public nodeId: string, public error: any) {
  }
}

export class ApprovePendingComment implements Action {
  readonly type = CommentsActionTypes.ApprovePendingComment;

  constructor(public commentId: string) {
  }
}

export class ApprovePendingCommentSuccess implements Action {
  readonly type = CommentsActionTypes.ApprovePendingCommentSuccess;

  constructor(public comment: Comment) {
  }
}

export class ApprovePendingCommentFail implements Action {
  readonly type = CommentsActionTypes.ApprovePendingCommentFail;

  constructor(public error: any) {
  }
}

export class RejectPendingComment implements Action {
  readonly type = CommentsActionTypes.RejectPendingComment;

  constructor(public commentId: string) {
  }
}

export class RejectPendingCommentSuccess implements Action {
  readonly type = CommentsActionTypes.RejectPendingCommentSuccess;

  constructor(public comment: Comment) {
  }
}

export class RejectPendingCommentFail implements Action {
  readonly type = CommentsActionTypes.RejectPendingCommentFail;

  constructor(public error: any) {
  }
}

export class UpdateCommentVote implements Action {
  readonly type = CommentsActionTypes.UpdateCommentVote;

  constructor(public nodeId: string, public vote: IVote) {
  }
}

export class UpdateCommentVoteCountSuccess implements Action {
  readonly type = CommentsActionTypes.UpdateCommentVoteCountSuccess;

  constructor(public nodeId: string, public commentId: string, public voteCount: IVoteCount) {
  }
}

export type CommentsAction =
    | LoadComments
    | LoadCommentsSuccess
    | LoadCommentsFail
    | LoadPendingComments
    | LoadPendingCommentsSuccess
    | LoadPendingCommentsFail
    | AddComment
    | AddCommentSuccess
    | AddCommentFail
    | ApprovePendingComment
    | ApprovePendingCommentSuccess
    | ApprovePendingCommentFail
    | RejectPendingComment
    | RejectPendingCommentSuccess
    | RejectPendingCommentFail
    | UpdateCommentVote
    | UpdateCommentVoteCountSuccess;
