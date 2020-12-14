export interface IVote {
  id?: string;
  commentId: string;
  vote: VoteType;
}

export enum VoteType {
  UP = 'UP',
  DOWN = 'DOWN',
  ABSTAIN = 'ABSTAIN'
}
