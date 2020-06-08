import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PageData, User } from '@app/core';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  public users$: Observable<User[]> = this.store.pipe(select(fromStore.getUsers));
  public usersPageData$: Observable<PageData> = this.store.pipe(select(fromStore.getUsersPageData));
  public activeView = 'list';
  public usersLoaded$: Observable<boolean> = this.store.pipe(select(fromStore.getUsersLoaded));

  constructor(private store: Store<CoreState>,
              private router: Router) {
  }

  public onButtonClicked() {
    this.router.navigate(['/users/add']);
  }

  public toggleActiveView(event) {
    this.activeView = event;
  }
}
