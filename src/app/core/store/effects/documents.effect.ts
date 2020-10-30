import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as documentsActions from '../actions';
import { catchError, concatMap, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { DocumentsService } from '../../services';
import { DocumentConsultationData, Error, Page, User } from '@app/core';
import { of } from 'rxjs';
import { DocumentConsolidate, DocumentMetadata } from '../../models/';
import { CoreState } from '@app/core/store';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { PageRequest } from '@app/core/models/page-request.model';

@Injectable()
export class DocumentsEffect {

  @Effect()
  loadDocuments$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.LoadDocuments),
      map((action: documentsActions.LoadDocuments) => action.payload),
      switchMap((pageRequest: PageRequest) => this.documentsService.list(pageRequest)
          .pipe(
              map((documentsPage: Page<DocumentMetadata>) => new documentsActions.LoadDocumentsSuccess(documentsPage)),
              catchError(error => of(new documentsActions.LoadDocumentsFail(error)))
          )
      ));

  @Effect()
  loadDocumentConsolidate$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.LoadDocumentConsolidate),
      map((action: documentsActions.LoadDocumentConsolidate) => action.payload),
      concatMap((id: string) => this.documentsService.get(id)
          .pipe(
              map((document: DocumentConsolidate) => new documentsActions.LoadDocumentConsolidateSuccess(document)),
              catchError(error => of(new documentsActions.LoadDocumentConsolidateFail(error))),
          )
      )
  );

  @Effect()
  saveDocument$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.SaveDocument),
      map((action: documentsActions.SaveDocument) => action.payload),
      concatMap((document: DocumentMetadata) => {
        return this.documentsService.save(document).pipe(
            map((metadataId: string) => new documentsActions.SaveDocumentSuccess(metadataId)),
            catchError(error => of(new documentsActions.SaveDocumentFail(this.mapError(error))))
        );
      })
  );

  @Effect({dispatch: false})
  saveDocumentSuccess$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.SaveDocumentSuccess),
      take(1),
      tap(() => this.router.navigate(['documents'])),
  );

  @Effect()
  saveDocumentAssignedUsers$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.SaveDocumentAssignedUsers),
      concatMap((action: documentsActions.SaveDocumentAssignedUsers) => {
        return this.documentsService.saveAssignedUsers(action.documentId, action.assignedUsers).pipe(
            mergeMap(() => [
              new documentsActions.SaveDocumentAssignedUsersSuccess(),
              new documentsActions.GetDocumentAssignedUsers(action.documentId)
            ]),
            catchError(error => of(new documentsActions.SaveDocumentAssignedUsersFail(this.mapError(error))))
        );
      })
  );

  @Effect()
  getDocumentAssignedUsers$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.GetDocumentAssignedUsers),
      concatMap((action: documentsActions.GetDocumentAssignedUsers) => {
        return this.documentsService.getAssignedUsers(action.documentId).pipe(
            map((users: User[]) => new documentsActions.GetDocumentAssignedUsersSuccess(users)),
            catchError(error => of(new documentsActions.GetDocumentAssignedUsersFail(this.mapError(error))))
        );
      })
  );

  @Effect()
  saveDocumentConsultationData$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.SaveDocumentConsultationData),
      concatMap((action: documentsActions.SaveDocumentConsultationData) => {
        return this.documentsService.saveDocumentConsultationData(action.documentId, action.documentConsultationData).pipe(
            mergeMap(() => [
              new documentsActions.SaveDocumentConsultationDataSuccess(),
              new documentsActions.GetDocumentConsultationData(action.documentId)
            ]),
            catchError(error => of(new documentsActions.SaveDocumentConsultationDataFail(this.mapError(error))))
        );
      })
  );

  @Effect()
  getDocumentConsultationData$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.GetDocumentConsultationData),
      concatMap((action: documentsActions.GetDocumentConsultationData) => {
        return this.documentsService.getDocumentConsultationData(action.documentId).pipe(
            map((documentConsultationData: DocumentConsultationData) =>
                new documentsActions.GetDocumentConsultationDataSuccess(documentConsultationData)),
            catchError(error => of(new documentsActions.GetDocumentConsultationDataFail(this.mapError(error))))
        );
      })
  );

  constructor(private store$: Store<CoreState>,
              private actions$: Actions,
              private documentsService: DocumentsService,
              private router: Router) {
  }

  private mapError(payload: any): Error {
    return payload.error.i18nFieldErrors;
  }
}
