import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromComments from '../reducers/comments.reducer';
import { Comment } from '../../models';

const getCommentsState = createSelector(fromFeature.getCoreState,
    (state: fromFeature.CoreState) => state.comments);

const getCommentsAsInterfaces = (nodeId) => createSelector(getCommentsState,
    (state) => fromComments.getCommentsEntitiesByDocumentNode(state, nodeId));

export const getCommentsEntitiesByNodeId = (nodeId) => createSelector(
    getCommentsAsInterfaces(nodeId),
    comments => comments.map(comment => new Comment(comment)));
