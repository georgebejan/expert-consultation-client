export interface IVote {
  id?: string;
  commentId: string;
  vote: VoteType;
}

export interface IVoteCount {
  [key: string]: number; // key ~ VoteType
}

export enum VoteType {
  UP = 'UP',
  DOWN = 'DOWN',
  ABSTAIN = 'ABSTAIN'
}
