import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@app/core';
import { FormControl, FormGroup } from '@angular/forms';
import { cloneDeep, isEqual } from 'lodash';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface UserFormValue {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  district: string;
  organisation: string;
}

@Component({
  selector: 'ec-imported-users-table-row',
  templateUrl: './imported-users-table-row.component.html',
  styleUrls: ['./imported-users-table-row.component.scss']
})
export class ImportedUsersTableRowComponent implements OnInit {
  @Input() user: User;
  @Output() update: EventEmitter<User> = new EventEmitter<User>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  public userForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    district: new FormControl(),
    organisation: new FormControl()
  });
  public theUser: User;

  constructor() {
  }

  ngOnInit() {
    this.userForm.patchValue(this.user);
    this.onChanges();
  }

  onChanges() {
    this.userForm.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(isEqual)
    ).subscribe(aFormValue => {
      this.updateUser(aFormValue);
      this.update.emit(this.theUser);
    });
  }

  updateUser(aFormValue: UserFormValue) {
    this.theUser = cloneDeep(this.user);
    Object.assign(this.theUser, aFormValue);
  }

  deleteUser() {
    this.delete.emit(this.user.email);
  }
}
