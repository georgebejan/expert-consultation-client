import { DocumentMetadata, Error, IDocumentConsolidate, IDocumentMetadata, IDocumentNode, IPageData, PageData } from '../../models';
import * as fromDocuments from '../actions/documents.action';
import * as fromDocumentNodes from '../actions/document-nodes.action';

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

const mapDocumentNodeTree = (document: IDocumentNode, mapping: (d) => IDocumentNode): IDocumentNode => ({
  ...mapping(document),
  children: document.children.map(x => mapDocumentNodeTree(x, mapping)),
});

export function reducer(state = initialState,
                        action: any): DocumentsState {

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
    case fromDocuments.DocumentsActionTypes.IncrementDocumentNodeCommentCount: {
      const incrementFn = (document: IDocumentNode) => ({
        ...document,
        numberOfComments: document.numberOfComments + (document.id === action.nodeId ? 1 : 0),
      });
      return {
        ...state,
        entity: {
          ...state.entity,
          documentNode: mapDocumentNodeTree(state.entity.documentNode, incrementFn),
        }
      };
    }
    case fromDocumentNodes.DocumentNodesActionTypes.UpdateDocumentNodeSuccess: {
      const updatedNode = action.payload;
      const updatedEntity = {
        ...state.entity,
        documentNode: getUpdatedNode(state.entity.documentNode, updatedNode)
      };

      return {
        ...state,
        entity: updatedEntity
      };
    }
    default: {
      return state;
    }
  }
}

export const getDocumentsEntities = (state: DocumentsState) => state.entities;
export const getDocumentsLoading = (state: DocumentsState) => state.loading;
export const getDocumentsLoaded = (state: DocumentsState) => state.loaded;
export const getDocumentsPageData = (state: DocumentsState) => state.pageData;
export const getDocumentEntity = (state: DocumentsState) => state.entity;
