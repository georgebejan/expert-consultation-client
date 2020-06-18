import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { User } from '@app/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ec-imported-users-table',
  templateUrl: './imported-users-table.component.html',
  styleUrls: ['./imported-users-table.component.scss']
})
export class ImportedUsersTableComponent implements OnChanges, OnDestroy {
  @Input() public importedUsers: User[] = [];
  @Output() public usersUpdated: EventEmitter<User[]> = new EventEmitter<User[]>();

  public usersTableForm;
  private subscription: Subscription = new Subscription();

  get getFormControls() {
    const controlArray = this.usersTableForm.get('users') as FormArray;
    return controlArray.controls;
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.usersTableForm = new FormGroup({
      users: new FormArray(this.importedUsers.map(user =>
          new FormGroup({
                lastName: new FormControl(user.lastName.trim(), [Validators.required, Validators.max(40)]),
                firstName: new FormControl(user.firstName.trim(), [Validators.required, Validators.max(40)]),
                email: new FormControl(user.email.trim(), [Validators.required, Validators.email]),
                phoneNumber: new FormControl(user.phoneNumber.trim(), [Validators.required, Validators.pattern('[0-9]{10}')]),
                district: new FormControl(user.district.trim(), [Validators.required, Validators.max(40)]),
                organisation: new FormControl(user.organisation.trim(), [Validators.required, Validators.max(40)]),
                isEditMode: new FormControl(false)
              }
          )))
    });

    this.subscription.add(this.usersTableForm.get('users').valueChanges.subscribe(formUsers => {
      this.usersUpdated.emit(formUsers.map(formUser => new User(formUser)));
    }));
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public deleteUser(index: number) {
    const usersFormArray = this.usersTableForm.controls.users as FormArray;
    usersFormArray.removeAt(index);
  }

  public editRow(formGroup: AbstractControl) {
    formGroup.get('isEditMode').setValue(true);
  }

  public finishRow(formGroup: AbstractControl) {
    formGroup.get('isEditMode').setValue(false);
  }

  public isEditMode(formGroup: AbstractControl) {
    return formGroup.get('isEditMode').value;
  }

  public getValue(formGroup: AbstractControl, field: string) {
    return formGroup.get(field).value;
  }
}
