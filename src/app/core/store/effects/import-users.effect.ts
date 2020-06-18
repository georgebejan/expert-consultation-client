import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as importUsersActions from '../actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../../models';
import { UserService } from '../../services';
import { Router } from '@angular/router';

@Injectable()
export class ImportUsersEffects {

  @Effect()
  saveImportedEffect$ = this.actions$.pipe(
      ofType(importUsersActions.ImportUserActionTypes.SaveImportedUsers),
      map((action: importUsersActions.SaveImportedUsers) => action.users),
      switchMap((users: User[]) => {
        return this.usersService.saveMultiple(users)
            .pipe(
                map((savedUsers: User[]) => new importUsersActions.ImportedUsersSaveSuccess(savedUsers)),
                catchError(payload => of(new importUsersActions.ImportedUsersSaveFailed(payload.error)))
            );
      })
  );

  @Effect({dispatch: false})
  successfulImportSave$ = this.actions$.pipe(
      ofType(importUsersActions.ImportUserActionTypes.ImportedUsersSaveSuccess),
      tap(() => this.router.navigate(['/users'])),
  );

  constructor(private actions$: Actions,
              private usersService: UserService,
              private router: Router) {
  }
}
