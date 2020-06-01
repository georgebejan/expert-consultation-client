import { DocumentNodeType } from './document-node-type.enum';

export interface IDocumentNode {
  id: string;
  title: string;
  content: string;
  numberOfComments: number;
  identifier: string;
  documentNodeType: DocumentNodeType;
  children: IDocumentNode[];
}

export class DocumentNode {
  id: string;
  title: string;
  content: string;
  numberOfComments: number;
  identifier: string;
  documentNodeType: DocumentNodeType;
  children: DocumentNode[];

  constructor(data: IDocumentNode) {
    this.fromJson(data);
  }

  fromJson(json: IDocumentNode) {
    this.id = json.id;
    this.title = json.title;
    this.content = json.content;
    this.documentNodeType = json.documentNodeType;
    this.numberOfComments = json.numberOfComments;
    this.identifier = json.identifier;
    this.children = json.children.map(value => new DocumentNode(value));
  }

  toJson(): IDocumentNode {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      identifier: this.identifier,
      documentNodeType: this.documentNodeType,
      numberOfComments: this.numberOfComments,
      children: this.children.map(value => value.toJson())
    };
  }

  displayedInMenu() {
    return this.documentNodeType === DocumentNodeType.ARTICLE
        || this.documentNodeType === DocumentNodeType.CHAPTER
        || this.documentNodeType === DocumentNodeType.SECTION;
  }
}
