import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as documentsActions from '../actions';
import { catchError, concatMap, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { DocumentsService } from '../../services';
import { Error, Page, User } from '@app/core';
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
            map((id: string) => new documentsActions.SaveDocumentSuccess(id)),
            catchError(error => of(new documentsActions.SaveDocumentFail(this.mapError(error))))
        );
      })
  );

  @Effect({dispatch: false})
  saveDocumentSuccess$ = this.actions$.pipe(
      ofType(documentsActions.DocumentsActionTypes.SaveDocumentSuccess),
      map((action: documentsActions.SaveDocumentSuccess) => action.payload),
      take(1),
      tap((id: string) => this.router.navigate(['documents', id, 'users'])),
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


  constructor(private store$: Store<CoreState>,
              private actions$: Actions,
              private documentsService: DocumentsService,
              private router: Router) {
  }

  private mapError(payload: any): Error {
    return payload.error.i18nFieldErrors;
  }
}
