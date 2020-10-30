import { Action } from '@ngrx/store';
import { DocumentConsolidate, DocumentConsultationData, DocumentMetadata, IDocumentMetadata, Page, PageRequest, User } from '../../models';

export enum DocumentsActionTypes {
  LoadDocuments = '[Documents] Load Documents',
  LoadDocumentsSuccess = '[Documents] Load Documents Success',
  LoadDocumentsFail = '[Documents] Load Documents Fail',

  SaveDocument = '[Documents] Save Documents',
  SaveDocumentSuccess = '[Documents] Save Documents Success',
  SaveDocumentFail = '[Documents] Save Documents Fail',

  LoadDocumentConsolidate = '[Documents] Load Document Consolidate',
  LoadDocumentConsolidateSuccess = '[Documents] Load Document Consolidate Success',
  LoadDocumentConsolidateFail = '[Documents] Load Document Consolidate Fail',

  SaveDocumentAssignedUsers = '[Documents] Save document assigned users',
  SaveDocumentAssignedUsersSuccess = '[Documents] Save document assigned users success',
  SaveDocumentAssignedUsersFail = '[Documents] Save document assigned users fail',

  GetDocumentAssignedUsers = '[Documents] Get document assigned users',
  GetDocumentAssignedUsersSuccess = '[Documents] Get document assigned users success',
  GetDocumentAssignedUsersFail = '[Documents] Get document assigned users fail',

  SaveDocumentConsultationData = '[Documents] Save document consultation data',
  SaveDocumentConsultationDataSuccess = '[Documents] Save document consultation data success',
  SaveDocumentConsultationDataFail = '[Documents] Save document consultation data fail',

  GetDocumentConsultationData = '[Documents] Get document consultation data',
  GetDocumentConsultationDataSuccess = '[Documents] Get document consultation data success',
  GetDocumentConsultationDataFail = '[Documents] Get document consultation data fail',

  IncrementDocumentNodeCommentCount = '[Documents] Increment document node comment count',
}

export class LoadDocuments implements Action {
  readonly type = DocumentsActionTypes.LoadDocuments;

  constructor(public payload: PageRequest) {
  }
}

export class LoadDocumentsSuccess implements Action {
  readonly type = DocumentsActionTypes.LoadDocumentsSuccess;

  constructor(public payload: Page<DocumentMetadata>) {
  }
}

export class LoadDocumentsFail implements Action {
  readonly type = DocumentsActionTypes.LoadDocumentsFail;

  constructor(public error: any) {
  }
}

export class LoadDocumentConsolidate implements Action {
  readonly type = DocumentsActionTypes.LoadDocumentConsolidate;

  constructor(public payload: string) {
  }
}

export class LoadDocumentConsolidateSuccess implements Action {
  readonly type = DocumentsActionTypes.LoadDocumentConsolidateSuccess;

  constructor(public payload: DocumentConsolidate) {
  }
}

export class LoadDocumentConsolidateFail implements Action {
  readonly type = DocumentsActionTypes.LoadDocumentConsolidateFail;

  constructor(public payload: any) {
  }
}

export class SaveDocument implements Action {
  readonly type = DocumentsActionTypes.SaveDocument;

  constructor(public payload: IDocumentMetadata) {
  }
}

export class SaveDocumentSuccess implements Action {
  readonly type = DocumentsActionTypes.SaveDocumentSuccess;

  constructor(public payload: string) {
  }
}

export class SaveDocumentFail implements Action {
  readonly type = DocumentsActionTypes.SaveDocumentFail;

  constructor(public payload: any) {
  }
}


export class SaveDocumentAssignedUsers implements Action {
  readonly type = DocumentsActionTypes.SaveDocumentAssignedUsers;

  constructor(public documentId: string, public assignedUsers: string[]) {
  }
}

export class SaveDocumentAssignedUsersSuccess implements Action {
  readonly type = DocumentsActionTypes.SaveDocumentAssignedUsersSuccess;
}

export class SaveDocumentAssignedUsersFail implements Action {
  readonly type = DocumentsActionTypes.SaveDocumentAssignedUsersFail;

  constructor(public error: any) {
  }
}


export class GetDocumentAssignedUsers implements Action {
  readonly type = DocumentsActionTypes.GetDocumentAssignedUsers;

  constructor(public documentId: string) {
  }
}

export class GetDocumentAssignedUsersSuccess implements Action {
  readonly type = DocumentsActionTypes.GetDocumentAssignedUsersSuccess;

  constructor(public payload: User[]) {
  }
}

export class GetDocumentAssignedUsersFail implements Action {
  readonly type = DocumentsActionTypes.GetDocumentAssignedUsersFail;

  constructor(public error: any) {
  }
}


export class SaveDocumentConsultationData implements Action {
  readonly type = DocumentsActionTypes.SaveDocumentConsultationData;

  constructor(public documentId: string, public documentConsultationData: DocumentConsultationData) {
  }
}

export class SaveDocumentConsultationDataSuccess implements Action {
  readonly type = DocumentsActionTypes.SaveDocumentConsultationDataSuccess;
}

export class SaveDocumentConsultationDataFail implements Action {
  readonly type = DocumentsActionTypes.SaveDocumentConsultationDataFail;

  constructor(public error: any) {
  }
}


export class GetDocumentConsultationData implements Action {
  readonly type = DocumentsActionTypes.GetDocumentConsultationData;

  constructor(public documentId: string) {
  }
}

export class GetDocumentConsultationDataSuccess implements Action {
  readonly type = DocumentsActionTypes.GetDocumentConsultationDataSuccess;

  constructor(public payload: DocumentConsultationData) {
  }
}

export class GetDocumentConsultationDataFail implements Action {
  readonly type = DocumentsActionTypes.GetDocumentConsultationDataFail;

  constructor(public error: any) {
  }
}

export class IncrementDocumentNodeCommentCount implements Action {
  readonly type = DocumentsActionTypes.IncrementDocumentNodeCommentCount;

  constructor(public nodeId: string) {
  }
}

export type DocumentsAction =
    | LoadDocuments
    | LoadDocumentsFail
    | LoadDocumentsSuccess
    | LoadDocumentConsolidate
    | LoadDocumentConsolidateFail
    | LoadDocumentConsolidateSuccess
    | SaveDocument
    | SaveDocumentSuccess
    | SaveDocumentFail
    | SaveDocumentAssignedUsers
    | SaveDocumentAssignedUsersSuccess
    | SaveDocumentAssignedUsersFail
    | GetDocumentAssignedUsers
    | GetDocumentAssignedUsersSuccess
    | GetDocumentAssignedUsersFail
    | IncrementDocumentNodeCommentCount
    | SaveDocumentConsultationData
    | SaveDocumentConsultationDataSuccess
    | SaveDocumentConsultationDataFail
    | GetDocumentConsultationData
    | GetDocumentConsultationDataSuccess
    | GetDocumentConsultationDataFail;
