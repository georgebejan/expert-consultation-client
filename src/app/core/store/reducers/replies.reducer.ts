import { IPageData, PageData } from '../../models';
import { RepliesAction, RepliesActionTypes } from '../actions/replies.action';
import { CommentsState } from './comments.reducer';

const initialState: CommentsState = {
  entities: {},
  pending: [],
  loading: false,
  pageData: {pageable: {}} as IPageData,
};

export function reducer(state = initialState, action: RepliesAction): CommentsState {
  switch (action.type) {
    case RepliesActionTypes.LoadReplies: {
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          loading: true
        },
      };
    }

    case RepliesActionTypes.LoadRepliesSuccess: {
      const pageData = new PageData();
      pageData.fromPage(action.commentsPage);
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          loading: false,
          entities: action.commentsPage.content.map(comment => comment.toJson()),
          pageData: pageData.toJson()
        },
      };
    }

    case RepliesActionTypes.LoadRepliesFail: {
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          error: action.error,
        },
      };
    }

    case RepliesActionTypes.AddReplySuccess: {
      const currentNodeState = state[action.commentId];
      if (!!currentNodeState) {
        const updatedNodeState = {
          ...currentNodeState,
          entities: [...currentNodeState.entities, action.comment.toJson()],
        };
        return {
          ...state,
          [action.commentId]: updatedNodeState
        };
      } else {
        return state;
      }
    }

    default: {
      return state;
    }
  }
}

export const getRepliesEntities = (state: CommentsState, commentId: string) =>
    state[commentId] && state[commentId].entities ? state[commentId].entities : [];
export const getRepliesLoading = (state: CommentsState, commentId: string) => state[commentId].loading;
