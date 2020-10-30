import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { DocumentsState } from '@app/core/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import * as fromStore from '../../core/store';

@Injectable()
export class DocumentBreakdownGuard implements CanActivate {
  constructor(private store: Store<DocumentsState>) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const documentMetadataId = route.params['metadataId'];
    this.store.dispatch(new fromStore.LoadDocumentConsolidate(documentMetadataId));

    return this.store.pipe(select(fromStore.getDocumentsMetadataLoaded))
        .pipe(
            filter(loaded => loaded),
            take(1)
        );
  }
}
