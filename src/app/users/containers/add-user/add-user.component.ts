import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  csv: boolean;
  excel: boolean;
  optionSelected: boolean;

  constructor(private router: Router,
              private store: Store<CoreState>) {
  }

  public redirectToAddSingleUser() {
    this.router.navigate(['/users/add/single']);
  }

  public redirectToImport() {
    this.router.navigate(['/users/add/csv']);
  }

  private userOptionSelected() {
    this.optionSelected = true;
  }

  private selectOption1() {
    this.csv = true;
    this.excel = false;
  }

  private selectOption2() {
    this.csv = false;
    this.excel = true;
  }

  private save(usersExcel: string) {
    this.store.dispatch(new fromStore.SaveUsersExcel(usersExcel));
  }
}
