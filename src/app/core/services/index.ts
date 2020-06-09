import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { DocumentsService } from './documents.service';
import { CommentsService } from './comments.service';
import { InvitationService } from './invitation.service';

export const services: any[] = [
  AuthenticationService,
  UserService,
  DocumentsService,
  CommentsService,
  InvitationService,
];

export * from './authentication.service';
export * from './user.service';
export * from './documents.service';
export * from './comments.service';
export * from './invitation.service';
