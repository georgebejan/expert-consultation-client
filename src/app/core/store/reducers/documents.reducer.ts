import { DocumentMetadata, Error, IDocumentConsolidate, IDocumentMetadata, IPageData, PageData } from '../../models';
import * as fromDocuments from '../actions/documents.action';

export interface DocumentsState {
  entities: { [id: string]: IDocumentMetadata };
  entity: IDocumentConsolidate;
  loaded: boolean;
  loading: boolean;
  pageData: IPageData;
  error: Error;
}

export const initialState: DocumentsState = {
  entities: {},
  entity: null,
  loaded: false,
  loading: false,
  pageData: {pageable: {}} as IPageData,
  error: null
};

export function reducer(state = initialState, action: fromDocuments.DocumentsAction): DocumentsState {

  switch (action.type) {
    case fromDocuments.DocumentsActionTypes.LoadDocuments:
      return {
        ...state,
        loading: true,
      };
    case fromDocuments.DocumentsActionTypes.LoadDocumentsSuccess: {
      const documentsPage = action.payload;
      const documents = documentsPage.content;
      const entities = documents.reduce((e: { [id: string]: DocumentMetadata }, document: DocumentMetadata) => {
        return {
          ...e,
          [document.id]: document.toJson(),
        };
      }, {});
      const pageData = new PageData();
      pageData.fromPage(documentsPage);

      return {
        ...state,
        loading: false,
        loaded: true,
        pageData: pageData.toJson(),
        entities,
      };
    }
    case fromDocuments.DocumentsActionTypes.LoadDocumentsFail:
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    case fromDocuments.DocumentsActionTypes.LoadDocumentConsolidate:
      return {
        ...state,
        loading: true,
        loaded: false,
        entity: null,
        error: null
      };
    case fromDocuments.DocumentsActionTypes.LoadDocumentConsolidateSuccess:
      return {
        ...state,
        loading: false,
        loaded: true,
        entity: action.payload.toJson(),
        error: null
      };
    case fromDocuments.DocumentsActionTypes.LoadDocumentConsolidateFail:
      return {
        ...state,
        loading: false,
        loaded: false,
        entity: null,
        error: action.payload
      };
    default: {
      return state;
    }

    case fromDocuments.DocumentsActionTypes.GetDocumentAssignedUsersSuccess: {
      const updatedDocument = {
        ...state.entity,
        assignedUsers: action.payload
      };

      return {
        ...state,
        entity: updatedDocument
      };
    }
  }
}

export const getDocumentsEntities = (state: DocumentsState) => state.entities;
export const getDocumentsLoading = (state: DocumentsState) => state.loading;
export const getDocumentsLoaded = (state: DocumentsState) => state.loaded;
export const getDocumentsPageData = (state: DocumentsState) => state.pageData;
export const getDocumentEntity = (state: DocumentsState) => state.entity;
