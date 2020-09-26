import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromComments from '../reducers/comments.reducer';
import { Comment, PageData } from '../../models';

const getCommentsState = createSelector(fromFeature.getCoreState,
    (state: fromFeature.CoreState) => state.comments);

const getCommentsAsInterfaces = (nodeId) => createSelector(getCommentsState,
    (state) => fromComments.getCommentsEntitiesByDocumentNode(state, nodeId));

export const getCommentsEntitiesByNodeId = (nodeId) => createSelector(
    getCommentsAsInterfaces(nodeId),
    comments => comments.map(comment => new Comment(comment)));

export const getPendingComments = createSelector(getCommentsState,
    (state: fromFeature.CommentsState) => state.pending.map(comment => new Comment(comment)));
export const getPendingCommentsLoading = createSelector(getCommentsState,
    (state: fromFeature.CommentsState) => state.loading);
export const getPendingCommentsPageData = createSelector(getCommentsState,
    (state: fromFeature.CommentsState) => {
      const pageData = new PageData();
      pageData.fromJson(state.pageData);
      return pageData;
    });
