import { AuthenticationApiService } from './authentication-api.service';
import { UserApiService } from './user-api.service';
import { DocumentsApiService } from './documents-api.service';
import { CommentsApiService } from './comments-api.service';
import { DocumentNodesApiService } from './document-nodes-api.service';
import { InvitationApiService } from './invitation-api.service';

export const httpServices: any[] = [
  AuthenticationApiService,
  UserApiService,
  DocumentsApiService,
  CommentsApiService,
  InvitationApiService,
  DocumentNodesApiService,
];

export * from './authentication-api.service';
export * from './user-api.service';
export * from './documents-api.service';
export * from './comments-api.service';
export * from './document-nodes-api.service';
export * from './invitation-api.service';
