import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentMetadata, PageData } from '@app/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { Router } from '@angular/router';
import { PageRequest } from '@app/core/models/page-request.model';

@Component({
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent {
  public documents$: Observable<DocumentMetadata[]> = this.store.pipe(select(fromStore.getDocuments));
  public documentsPageData$: Observable<PageData> = this.store.pipe(select(fromStore.getDocumentsPageData));
  public documentsLoaded$: Observable<boolean> = this.store.pipe(select(fromStore.getDocumentsLoaded));
  public documentLoading$: Observable<boolean> = this.store.pipe(select(fromStore.getDocumentsLoading));

  constructor(private store: Store<CoreState>,
              private router: Router) {
  }

  public onAddButtonClick() {
    this.router.navigate(['/documents/add']);
  }

  public onRowClick(id: string) {
    this.router.navigate(['documents', id]);
  }

  public onPageChange(pageRequest: PageRequest) {
    this.store.dispatch(new fromStore.LoadDocuments(pageRequest));
  }
}
