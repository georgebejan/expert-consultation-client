import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import * as fromFilePathActions from '@app/core/store/actions';
import * as fromFilePath from '@app/core/store/selectors';
import { BaseComponent } from '@app/shared/components/base-component';
import { takeUntil, tap } from 'rxjs/operators';
import { DocumentMetadata } from '@app/core';

@Component({
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent extends BaseComponent {
  public document = new DocumentMetadata();
  public filePath$ = this.store$.pipe(select(fromFilePath.selectResult));

  private filePath = '';

  constructor(private store$: Store<CoreState>) {
    super();

    this.filePath$.pipe(
        tap(filePath => {
          if (this.filePath && this.filePath !== '') {
            this.store$.dispatch(
                new fromFilePathActions.DeleteRequest(this.filePath)
            );
          }
          this.filePath = filePath;
        }),
        takeUntil(this.destroyed$)
    );
  }

  public onSave(document: DocumentMetadata) {
    this.store$.dispatch(new fromStore.SaveDocument(document));
  }
}
