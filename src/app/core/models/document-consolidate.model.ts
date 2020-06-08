import { DocumentMetadata, IDocumentMetadata } from './document-metadata.model';
import { DocumentNode, IDocumentNode } from './document-node.model';
import { IUser, User } from './user.model';

export interface IDocumentConsolidate {
  id: string;
  documentMetadata: IDocumentMetadata;
  documentNode?: IDocumentNode;
  assignedUsers: IUser[];
}

export class DocumentConsolidate {
  id: string;
  documentMetadata: DocumentMetadata;
  documentNode?: DocumentNode;
  assignedUsers: User[];

  constructor(data: IDocumentConsolidate) {
    this.fromJson(data);
  }

  fromJson(data: IDocumentConsolidate) {
    this.id = data.id;
    this.documentMetadata = new DocumentMetadata(data.documentMetadata);
    this.documentNode = new DocumentNode(data.documentNode);
    this.assignedUsers = data.assignedUsers.map(iUser => new User(iUser));
  }

  toJson(): IDocumentConsolidate {
    return {
      id: this.id,
      documentMetadata: this.documentMetadata.toJson(),
      documentNode: this.documentNode.toJson(),
      assignedUsers: this.assignedUsers.map(user => user.toJson())
    };
  }
}
