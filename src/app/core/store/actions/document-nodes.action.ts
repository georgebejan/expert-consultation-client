import { Action } from '@ngrx/store';
import { DocumentNodeSimple } from '../../models';

export enum DocumentNodesActionTypes {
  UpdateDocumentNode = '[Document Nodes] Update Document Node',
  UpdateDocumentNodeSuccess = '[Document Nodes] Update Document Node Success',
  UpdateDocumentNodeFail = '[Document Nodes] Update Document Node Fail'
}

export class UpdateDocumentNode implements Action {
  readonly type = DocumentNodesActionTypes.UpdateDocumentNode;

  constructor(public payload: DocumentNodeSimple) {
  }
}

export class UpdateDocumentNodeSuccess implements Action {
  readonly type = DocumentNodesActionTypes.UpdateDocumentNodeSuccess;

  constructor(public payload: DocumentNodeSimple) {
  }
}

export class UpdateDocumentNodeFail implements Action {
  readonly type = DocumentNodesActionTypes.UpdateDocumentNodeFail;

  constructor(public error: any) {
  }
}

export type DocumentNodesAction =
    | UpdateDocumentNode
    | UpdateDocumentNodeSuccess
    | UpdateDocumentNodeFail;
