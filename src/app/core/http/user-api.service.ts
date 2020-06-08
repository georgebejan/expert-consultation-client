import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser, Page, PageRequest } from '../models';

@Injectable()
export class UserApiService {
  constructor(private http: HttpClient) {
  }

  public list(pageRequest: PageRequest): Observable<Page<IUser>> {
    const params = new HttpParams()
        .set('page', pageRequest.number.toString())
        .set('size', pageRequest.size.toString());

    return this.http.get<any>(`${environment.api_url}/users`, {params})
        .pipe(
            catchError(aError => observableThrowError(aError))
        );
  }

  public save(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.api_url}/users`, user, {})
        .pipe(
            catchError(aError => observableThrowError(aError))
        );
  }

  public saveMultiple(users: IUser[]): Observable<IUser[]> {
    return this.http.post<IUser[]>(`${environment.api_url}/users/bulk`, users, {})
        .pipe(
            catchError(aError => observableThrowError(aError))
        );
  }

  public saveExcel(usersExcel: string) {
    return this.http.post<IUser[]>(`${environment.api_url}/users/extract-from-copy`, [usersExcel], {})
        .pipe(
            catchError(aError => observableThrowError(aError))
        );
  }
}
