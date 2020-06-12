import { Component, Input, OnInit } from '@angular/core';
import { User } from '@app/core';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';

@Component({
  selector: 'ec-imported-users-table',
  template: `
    <div *ngIf="importedUsers.length>0" class="table-container" role="table">
      <div class="flex-table header" role="rowgroup">
        <div class="flex-row first" role="columnheader">{{'users.table.column.lastName' | translate}}</div>
        <div class="flex-row" role="columnheader">{{'users.table.column.firstName' | translate}}</div>
        <div class="flex-row" role="columnheader">{{'users.table.column.email' | translate}}</div>
        <div class="flex-row" role="columnheader">{{'users.table.column.phoneNumber' | translate}}</div>
        <div class="flex-row" role="columnheader">{{'users.table.column.district' | translate}}</div>
        <div class="flex-row" role="columnheader">{{'users.table.column.organisation' | translate}}</div>
        <div class="flex-row delete-column" role="columnheader"></div>
      </div>
      <ec-imported-users-table-row *ngFor="let user of importedUsers" [user]="user"
                                   (update)="onImportedUserUpdate($event)"
                                   (delete)="onImportedUserDelete($event)"></ec-imported-users-table-row>
    </div>
    <div *ngIf="importedUsers.length > 0" class="ec-button-wrapper">
      <button class="ec-button" mat-flat-button (click)="onSaveImportedUsers()">
        {{"button.save" | translate}}
      </button>
    </div>
  `,
  styleUrls: ['./imported-users-table.component.scss']
})
export class ImportedUsersTableComponent implements OnInit {
  @Input() importedUsers: User[] = [];
  public tableConfig: any = {};
  private error: any = {};

  constructor(private store: Store<CoreState>) {
  }

  ngOnInit() {
    this.tableConfig = {
      displayedColumns: [
        'lastName',
        'firstName',
        'email',
        'phoneNumber',
        'district',
        'organisation',
      ],
    };
    this.store.select(fromStore.getImportUsersErrors).subscribe((error) => {
      this.error = error;
    });
  }

  onImportedUserUpdate(user: User) {
    this.store.dispatch(new fromStore.UpdateImportedUser(user));
  }

  onImportedUserDelete(email: string) {
    this.store.dispatch(new fromStore.DeleteImportedUser(email));
  }

  onSaveImportedUsers() {
    this.store.dispatch(new fromStore.SaveImportedUsers());
  }
}
