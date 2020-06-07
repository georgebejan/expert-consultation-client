export interface IComment {
  id: string;
  text: string;
  user: string;
  lastEditDateTime: Date;
}

export class Comment {
  id: string;
  text: string;
  user: string;
  lastEditDateTime: Date;

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
  }

  toJson(): IComment {
    return {
      id: this.id,
      text: this.text,
      user: this.user,
      lastEditDateTime: this.lastEditDateTime
    };
  }
}
