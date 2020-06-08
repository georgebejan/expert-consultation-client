import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserState } from '@app/core/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import * as fromStore from '../../core/store';
import { PageRequest } from '@app/core';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private store: Store<UserState>) {
  }

  canActivate(): Observable<boolean> {
    return this.checkStore()
        .pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
  }

  private checkStore(): Observable<boolean> {
    return this.store.pipe(select(fromStore.getUsersShouldReload))
        .pipe(
            tap((shouldReload) => {
              if (shouldReload) {
                this.store.dispatch(new fromStore.LoadUsers(new PageRequest()));
              }
            }),
            filter(shouldReload => !shouldReload),
            take(1)
        );
  }
}
