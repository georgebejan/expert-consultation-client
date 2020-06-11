import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CoreState } from '@app/core/store';
import { DocumentNodeSimple, Error } from '../../models';
import * as documentNodesActions from '../actions';
import { catchError, concatMap, map } from 'rxjs/operators';
import { DocumentNodesService } from '../../services';
import { of } from 'rxjs';

@Injectable()
export class DocumentNodesEffect {

  @Effect()
  updateDocumentNode$ = this.actions$.pipe(
      ofType(documentNodesActions.DocumentNodesActionTypes.UpdateDocumentNode),
      map((action: documentNodesActions.UpdateDocumentNode) => action.payload),
      concatMap((documentNode: DocumentNodeSimple) => {
        return this.documentNodesService.update(documentNode).pipe(
            map((updatedNode: DocumentNodeSimple) => new documentNodesActions.UpdateDocumentNodeSuccess(updatedNode)),
            catchError(error => of(new documentNodesActions.SaveDocumentFail(this.mapError(error))))
        );
      })
  );

  constructor(private store$: Store<CoreState>,
              private actions$: Actions,
              private documentNodesService: DocumentNodesService) {
  }

  private mapError(payload: any): Error {
    return payload.error.i18nFieldErrors;
  }
}
