import { Component } from '@angular/core';
import { User, UserService } from '@app/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromStore from '@app/core/store';
import { CoreState } from '@app/core/store';
import { Observable } from 'rxjs';
import { Error } from '@app/core/models/error.model';

@Component({
  selector: 'ec-add-single-user',
  templateUrl: './add-single-user.component.html',
  styleUrls: ['./add-single-user.component.scss']
})
export class AddSingleUserComponent {
  public user: User = new User();
  public error$: Observable<Error> = this.store.pipe(select(fromStore.getUsersErrors));

  constructor(private router: Router,
              private usersService: UserService,
              private store: Store<CoreState>) {
  }

  public onCancel() {
    this.router.navigate(['/users']);
  }

  public onSave(user: User) {
    this.store.dispatch(new fromStore.SaveUser(user));
  }
}
