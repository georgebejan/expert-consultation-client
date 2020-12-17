import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVote, IVoteCount, VoteType } from '@app/core/models/vote.model';
import { environment } from '@env/environment';

@Injectable()
export class VoteApiService {
  static VOTE_API_URL = `${environment.api_url}/votes`;

  constructor(private http: HttpClient) {}

  getVotes(commentId: string) {
    return this.http.get<IVoteCount>(`${VoteApiService.VOTE_API_URL}/${commentId}`);
  }

  createVote(commentId: string, voteType: VoteType) {
    const payload: IVote = {commentId, vote: voteType};
    return this.http.put<IVote>(VoteApiService.VOTE_API_URL, payload);
  }

  updateVote(voteId: string, commentId: string, voteType: VoteType) {
    const payload: IVote = {id: voteId, commentId, vote: voteType};
    return this.http.post<IVote>(VoteApiService.VOTE_API_URL, payload);
  }
}
