import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvitationApiService } from '../http/invitation-api.service';
import { Invitation } from '../models/invitation.model';

@Injectable()
export class InvitationService {
  constructor(private invitationApiService: InvitationApiService) {
  }

  public get(code: string): Observable<Invitation> {
    return this.invitationApiService.get(code);
  }
}
