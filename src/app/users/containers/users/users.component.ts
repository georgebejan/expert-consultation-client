import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PageData, PageRequest, User } from '@app/core';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'ec-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public users$: Observable<User[]> = this.store.pipe(select(fromStore.getUsers));
  public usersPageData$: Observable<PageData> = this.store.pipe(select(fromStore.getUsersPageData));
  public usersLoaded$: Observable<boolean> = this.store.pipe(select(fromStore.getUsersLoaded));

  constructor(private store: Store<CoreState>) {
  }

  public onPageChange(pageRequest: PageRequest) {
    this.store.dispatch(new fromStore.LoadUsers(pageRequest));
  }
}
