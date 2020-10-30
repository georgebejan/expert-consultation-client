import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { DocumentsState } from '@app/core/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import * as fromStore from '../../core/store';
import { PageRequest } from '@app/core/models/page-request.model';

@Injectable()
export class DocumentsGuard implements CanActivate {
  constructor(private store: Store<DocumentsState>) {
  }

  canActivate(): Observable<boolean> {
    return this.checkStore()
        .pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
  }

  private checkStore(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getDocumentsMetadataLoaded))
        .pipe(
            tap((loaded) => {
              this.store.dispatch(new fromStore.LoadDocuments(new PageRequest()));
            }),
            take(1)
        );
  }
}
