import { UploadFileEffects } from './file-upload.effect';
import { UsersEffects } from './users.effect';
import { ImportUsersEffects } from './import-users.effect';
import { DocumentsEffect } from './documents.effect';
import { CommentsEffect } from './comments.effect';
import { DocumentNodesEffect } from './document-nodes.effect';
import { RepliesEffect } from './replies.effect';

export const effects: any[] = [
  UploadFileEffects,
  UsersEffects,
  DocumentsEffect,
  ImportUsersEffects,
  CommentsEffect,
  RepliesEffect,
  DocumentNodesEffect,
];

export * from './file-upload.effect';
export * from './users.effect';
export * from './import-users.effect';
export * from './documents.effect';
export * from './comments.effect';
export * from './document-nodes.effect';
export * from './replies.effect';
