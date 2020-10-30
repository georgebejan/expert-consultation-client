import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromDocuments from '../reducers/documents.reducer';
import { DocumentConsolidate, DocumentMetadata, IDocumentConsolidate, IDocumentMetadata, IPageData, PageData } from '../../models';

const getDocumentsMetadataState = createSelector(fromFeature.getCoreState, (state: fromFeature.CoreState) => state.documentsMetadata);

const getDocumentsMetadataAsInterfaces = createSelector(getDocumentsMetadataState, fromDocuments.getDocumentsEntities);
const getDocumentConsolidateAsInterface = createSelector(getDocumentsMetadataState, fromDocuments.getDocumentEntity);

export const getDocumentsMetadataEntities = createSelector(getDocumentsMetadataAsInterfaces,
    (documents: { [id: string]: IDocumentMetadata }) => {
      const documentsEntities = {};

      Object.keys(documents).forEach(key => {
        documentsEntities[key] = new DocumentMetadata(documents[key]);
      });

      return documentsEntities;
    }
);

export const getDocumentsPageDataAsInterface = createSelector(getDocumentsMetadataState, fromDocuments.getDocumentsPageData);
export const getDocumentsPageData = createSelector(getDocumentsPageDataAsInterface,
    (iPageData: IPageData) => {
      const pageData = new PageData();
      pageData.fromJson(iPageData);
      return pageData;
    });

export const getDocumentsMetadata = createSelector(getDocumentsMetadataEntities,
    (entities: { [id: number]: DocumentMetadata }) => Object.keys(entities).map(id => entities[id])
);
export const getDocumentsMetadataLoaded = createSelector(getDocumentsMetadataState, fromDocuments.getDocumentsLoaded);
export const getDocumentsMetadataLoading = createSelector(getDocumentsMetadataState, fromDocuments.getDocumentsLoading);
export const getDocumentConsolidate = createSelector(getDocumentConsolidateAsInterface,
    (documentConsolidate: IDocumentConsolidate) => new DocumentConsolidate(documentConsolidate));
export const getDocumentMetadata = createSelector(getDocumentConsolidate,
    (documentConsolidate: DocumentConsolidate) => documentConsolidate.documentMetadata);
