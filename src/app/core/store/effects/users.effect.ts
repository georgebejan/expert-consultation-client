import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as usersActions from '../actions/users.action';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from '../../services';
import { of } from 'rxjs';
import { Error, Page, PageRequest, User } from '../../models';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {
  @Effect()
  loadUsers$ = this.actions$.pipe(
      ofType(usersActions.UserActionTypes.LoadUsers),
      map((action: usersActions.LoadUsers) => action.payload),
      switchMap((pageRequest: PageRequest) => {
        return this.usersService.list(pageRequest)
            .pipe(
                map((usersPage: Page<User>) => new usersActions.LoadUsersSuccess(usersPage)),
                catchError(error => of(new usersActions.LoadUsersFail(error)))
            );
      })
  );

  @Effect()
  saveUser$ = this.actions$.pipe(
      ofType(usersActions.UserActionTypes.SaveUser),
      map((action: usersActions.SaveUser) => action.payload),
      switchMap((user: User) => {
        return this.usersService.save(user)
            .pipe(
                map((savedUser: User) => new usersActions.SaveUserSuccess(savedUser)),
                catchError(error => of(new usersActions.SaveUserFail(this.mapPayloadToUserSaveError(error))))
            );
      })
  );

  @Effect({dispatch: false})
  successfulSave$ = this.actions$.pipe(
      ofType(usersActions.UserActionTypes.SaveUserSuccess),
      tap(() => this.router.navigate(['/users'])),
  );

  @Effect()
  saveUsersExcel = this.actions$.pipe(
      ofType(usersActions.UserActionTypes.SaveUsersExcel),
      map((action: usersActions.SaveUsersExcel) => action.payload),
      switchMap((usersExcel: string) => {
        return this.usersService.saveUsersExcel(usersExcel)
            .pipe(
                map((savedUser: User[]) => new usersActions.SaveUserExcelSuccess(savedUser)),
                catchError(error => of(new usersActions.SaveUserExcelFail(error)))
            );
      })
  );

  @Effect({dispatch: false})
  successfulExcelSave = this.actions$.pipe(
      ofType(usersActions.UserActionTypes.SaveUserExcelSuccess),
      take(1),
      tap(() => this.router.navigate(['/users']))
  );

  constructor(private actions$: Actions,
              private usersService: UserService,
              private router: Router) {
  }

  mapPayloadToUserSaveError(payload: any): Error {
    return payload.error.i18nFieldErrors;
  }
}
