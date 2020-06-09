import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Invitation } from '../models/invitation.model';

@Injectable()
export class InvitationApiService {

  constructor(private http: HttpClient) {
  }

  private get url() {
    return `${environment.api_url}/invitations`;
  }

  public get(code: string): Observable<Invitation> {
    return this.http.get<Invitation>(`${this.url}/${code}`);
  }
}
