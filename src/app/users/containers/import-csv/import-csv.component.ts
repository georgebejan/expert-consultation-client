import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CoreState } from '../../../core/store';
import * as fromStore from '@app/core/store';
import { PageRequest, User } from '@app/core';

@Component({
  selector: 'ec-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.scss']
})
export class ImportCsvComponent {
  public importedUsers$ = this.store.pipe(select(fromStore.getImportUsers));

  constructor(private store: Store<CoreState>) {
  }

  public onCsvUploaded(result: any) {
    const users: User[] = result;
    this.store.dispatch(new fromStore.ImportFromCsvSuccess(users));
    this.store.dispatch(new fromStore.LoadUsers(new PageRequest()));
    this.store.dispatch(new fromStore.UploadResetAction());
  }
}
