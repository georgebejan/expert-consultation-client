import { IVote, IVoteCount } from '@app/core/models/vote.model';

export interface IComment {
  id: string;
  text: string;
  user: string;
  lastEditDateTime: Date;
  nodeTitle?: string;
  nodeContent?: string;
  documentTitle?: string;
  voteCount?: IVoteCount;
  myVote?: IVote;
}

export class Comment {
  id: string;
  text: string;
  user: string;
  lastEditDateTime: Date;
  nodeTitle: string;
  nodeContent: string;
  documentTitle: string;
  voteCount?: IVoteCount;
  myVote?: IVote;

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
    this.voteCount = data.voteCount;
    this.myVote = data.myVote;
  }

  toJson(): IComment {
    return {
      id: this.id,
      text: this.text,
      user: this.user,
      lastEditDateTime: this.lastEditDateTime,
      nodeTitle: this.nodeTitle,
      nodeContent: this.nodeContent,
      documentTitle: this.documentTitle,
      voteCount: this.voteCount,
      myVote: this.myVote,
    };
  }
}
