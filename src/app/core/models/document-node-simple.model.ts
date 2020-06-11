import { DocumentNodeType } from './document-node-type.enum';

export interface IDocumentNodeSimple {
  id: string;
  title: string;
  content: string;
  identifier: string;
  documentNodeType: DocumentNodeType;
}

export class DocumentNodeSimple {
  id: string;
  title: string;
  content: string;
  identifier: string;
  documentNodeType: DocumentNodeType;

  constructor(data: IDocumentNodeSimple) {
    this.fromJson(data);
  }

  fromJson(json: IDocumentNodeSimple) {
    this.id = json.id;
    this.title = json.title;
    this.content = json.content;
    this.documentNodeType = json.documentNodeType;
    this.identifier = json.identifier;
  }

  toJson(): IDocumentNodeSimple {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      identifier: this.identifier,
      documentNodeType: this.documentNodeType,
    };
  }
}
