import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { User } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ec-import-csv',
  templateUrl: './add-users-csv.component.html',
  styleUrls: ['./add-users-csv.component.scss']
})
export class AddUsersCsvComponent {
  public importedUsers$ = this.store.pipe(select(fromStore.getImportUsers));
  public isFileUploaded = false;

  private usersToImport: User[] = [];

  constructor(private store: Store<CoreState>,
              private router: Router) {
  }

  public onCsvUploaded(users: User[]) {
    this.isFileUploaded = true;
    this.store.dispatch(new fromStore.ImportFromCsvSuccess(users));
    this.store.dispatch(new fromStore.UploadResetAction());
  }

  public onUsersUpdated(users: User[]) {
    this.usersToImport = users;
  }

  public onSave() {
    this.store.dispatch(new fromStore.SaveImportedUsers(this.usersToImport));
  }

  public onCancel() {
    this.router.navigate(['/users']);
  }
}
