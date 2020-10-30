import { DocumentMetadata, IDocumentMetadata } from './document-metadata.model';
import { DocumentNode, IDocumentNode } from './document-node.model';
import { IUser, User } from './user.model';
import { DocumentConfiguration, IDocumentConfiguration } from '@app/core/models/document-configuration.model';

export interface IDocumentConsolidate {
  id: string;
  documentMetadata: IDocumentMetadata;
  documentConfiguration: IDocumentConfiguration;
  documentNode?: IDocumentNode;
  assignedUsers: IUser[];
}

export class DocumentConsolidate {
  id: string;
  documentMetadata: DocumentMetadata;
  documentConfiguration: DocumentConfiguration;
  documentNode?: DocumentNode;
  assignedUsers: User[];

  constructor(data: IDocumentConsolidate) {
    this.fromJson(data);
  }

  fromJson(data: IDocumentConsolidate) {
    this.id = data.id;
    this.documentMetadata = new DocumentMetadata(data.documentMetadata);
    this.documentConfiguration = new DocumentConfiguration(data.documentConfiguration);
    this.documentNode = new DocumentNode(data.documentNode);
    this.assignedUsers = data.assignedUsers.map(iUser => new User(iUser));
  }

  toJson(): IDocumentConsolidate {
    return {
      id: this.id,
      documentMetadata: this.documentMetadata.toJson(),
      documentConfiguration: this.documentConfiguration.toJson(),
      documentNode: this.documentNode.toJson(),
      assignedUsers: this.assignedUsers.map(user => user.toJson())
    };
  }
}

export interface IDocumentConsultationData {
  startDate: Date;
  consultationDeadline: Date;
  excludedFromConsultation: boolean;
}

export class DocumentConsultationData {
  consultationStartDate: Date;
  consultationDeadline: Date;
  excludedFromConsultation: boolean;

  constructor(data: IDocumentConsultationData) {
    this.fromJson(data);
  }

  fromJson(data: IDocumentConsultationData) {
    this.consultationStartDate = data.startDate;
    this.consultationDeadline = data.consultationDeadline;
    this.excludedFromConsultation = data.excludedFromConsultation;
  }

  toJson(): IDocumentConsultationData {
    return {
      startDate: this.consultationStartDate,
      consultationDeadline: this.consultationDeadline,
      excludedFromConsultation: this.excludedFromConsultation
    };
  }
}
