import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Invitation, InvitationService } from '@app/core';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { I18nErrors } from '@app/core/http/errors/i18n-errors';

@Injectable()
export class InvitationResolver implements Resolve<Invitation> {
  constructor(private invitationService: InvitationService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Invitation> {
    const code = route.paramMap.get('code');
    return this.invitationService.get(code).pipe(
        catchError((httpError: HttpErrorResponse) => {
          const i18nErrors: I18nErrors = httpError.error;
          const i18nError = i18nErrors.i18nErrors[0];
          this.router.navigate(['/login'], {queryParams: {error: i18nError.i18nErrorKey}});
          return EMPTY;
        })
    );
  }
}
