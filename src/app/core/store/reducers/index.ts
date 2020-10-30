import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';
import * as fromDocuments from './documents.reducer';
import * as fromFileUpload from './file-upload.reducer';
import * as fromImportUsers from './import-users.reducer';
import * as fromComments from './comments.reducer';
import * as fromReplies from './replies.reducer';

export interface State {
  core: CoreState;
}

export interface CoreState {
  users: fromUsers.UserState;
  fileUpload: fromFileUpload.FileUploadState;
  importUsers: fromImportUsers.ImportUserState;
  documentsMetadata: fromDocuments.DocumentsState;
  comments: fromComments.CommentsState;
  replies: fromComments.CommentsState;
}

export const reducers: ActionReducerMap<CoreState> = {
  users: fromUsers.reducer,
  documentsMetadata: fromDocuments.reducer,
  fileUpload: fromFileUpload.reducer,
  importUsers: fromImportUsers.reducer,
  comments: fromComments.reducer,
  replies: fromReplies.reducer,
};

export const getCoreState = createFeatureSelector<CoreState>('core');

export { UserState } from './users.reducer';
export { FileUploadState } from './file-upload.reducer';
export { DocumentsState } from './documents.reducer';
export { ImportUserState } from './import-users.reducer';
export { CommentsState } from './comments.reducer';
