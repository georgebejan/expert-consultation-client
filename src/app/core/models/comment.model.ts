export interface IComment {
  id: string;
  text: string;
  user: string;
  lastEditDateTime: Date;
  nodeTitle: string;
  nodeContent: string;
  documentTitle: string;
}

export class Comment implements IComment {
  id: string;
  text: string;
  user: string;
  lastEditDateTime: Date;
  nodeTitle: string;
  nodeContent: string;
  documentTitle: string;

  constructor(data?: IComment) {
    if (data) {
      this.fromJson(data);
    }
  }

  fromJson(data: IComment) {
    this.id = data.id;
    this.text = data.text;
    this.user = data.user;
    this.lastEditDateTime = data.lastEditDateTime;
    this.nodeTitle = data.nodeTitle;
    this.nodeContent = data.nodeContent;
    this.documentTitle = data.documentTitle;
  }

  toJson(): IComment {
    return {
      id: this.id,
      text: this.text,
      user: this.user,
      lastEditDateTime: this.lastEditDateTime,
      nodeTitle: this.nodeTitle,
      nodeContent: this.nodeContent,
      documentTitle: this.documentTitle
    };
  }
}
