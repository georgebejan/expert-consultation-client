import { IComment } from '@app/core/models/comment.model';
import * as fromComments from '../actions/comments.action';
import { Error, IPageData, PageData } from '../../models';

export interface CommentsEntry {
  entities: IComment[];
  loading: boolean;
  pageData: IPageData;
  error: Error;
}

export interface CommentsState {
  [nodeId: string]: CommentsEntry | any;
  pending: IComment[];
  pageData: IPageData;
  loading: boolean;
}

const initialState: CommentsState = {
  pending: [],
  loading: false,
  pageData: {pageable: {}} as IPageData,
};

export function reducer(state = initialState, action: fromComments.CommentsAction): CommentsState {
  switch (action.type) {
    case fromComments.CommentsActionTypes.LoadComments: {
      const nodeId = action.nodeId;
      const currentNodeState = state[nodeId];
      const updatedNodeState = {
        ...currentNodeState,
        loading: true
      };

      return {
        ...state,
        [nodeId]: updatedNodeState
      };
    }

    case fromComments.CommentsActionTypes.LoadCommentsSuccess: {
      const nodeId = action.nodeId;
      const commentsPage = action.commentsPage;
      const comments = commentsPage.content;
      const pageData = new PageData();
      pageData.fromPage(commentsPage);

      const currentNodeState = state[nodeId];
      const updatedNodeState = {
        ...currentNodeState,
        loading: false,
        entities: comments.map(comment => comment.toJson()),
        pageData: pageData.toJson()
      };

      return {
        ...state,
        [nodeId]: updatedNodeState
      };
    }

    case fromComments.CommentsActionTypes.LoadCommentsFail: {
      const nodeId = action.nodeId;
      const error = action.error;

      const currentNodeState = state[nodeId];
      const updatedNodeState = {
        ...currentNodeState,
        error
      };

      return {
        ...state,
        [nodeId]: updatedNodeState
      };
    }

    case fromComments.CommentsActionTypes.LoadPendingComments: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromComments.CommentsActionTypes.LoadPendingCommentsSuccess: {
      const commentsPage = action.commentsPage;
      const comments = commentsPage.content;
      const pageData = new PageData();
      pageData.fromPage(commentsPage);

      return {
        ...state,
        loading: false,
        pending: comments,
        pageData,
      };
    }

    case fromComments.CommentsActionTypes.ApprovePendingCommentSuccess: {
      const approvedComment = action.comment;
      const pendingComments = state.pending.filter(pendingComment => pendingComment.id !== approvedComment.id);

      return {
        ...state,
        pending: pendingComments
      };
    }

    case fromComments.CommentsActionTypes.RejectPendingCommentSuccess: {
      const rejectedComment = action.comment;
      const pendingComments = state.pending.filter(pendingComment => pendingComment.id !== rejectedComment.id);

      return {
        ...state,
        pending: pendingComments
      };
    }

    case fromComments.CommentsActionTypes.UpdateCommentVote: {
      const {nodeId, vote} = action;
      return updateCommentPropsByNodeAndCommentId(state, nodeId, vote.commentId, {myVote: vote});
    }

    case fromComments.CommentsActionTypes.UpdateCommentVoteCountSuccess: {
      const {nodeId, commentId, voteCount} = action;
      return updateCommentPropsByNodeAndCommentId(state, nodeId, commentId, {voteCount});
    }

    default: {
      return state;
    }
  }
}

function updateCommentPropsByNodeAndCommentId(state: CommentsState, nodeId: string, commentId: string, commentProps: any) {
  const oldComments = state[nodeId] && (state[nodeId] as CommentsEntry).entities;
  const index = oldComments && oldComments.findIndex(c => c.id === commentId);
  const updatedComment: IComment = (index !== -1) && {...oldComments[index], ...commentProps};
  const newComments = [...oldComments.slice(0, index), updatedComment, ...oldComments.slice(index + 1)];
  return updatedComment
      ? {...state, [nodeId]: {...state[nodeId], entities: newComments}}
      : state;
}

export const getCommentsEntitiesByDocumentNode = (state: CommentsState, nodeId: string) =>
    state[nodeId] && state[nodeId].entities ? state[nodeId].entities : [];
export const getCommentsLoading = (state: CommentsState, nodeId: string) => state[nodeId].loading;
