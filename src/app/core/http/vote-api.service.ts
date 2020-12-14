import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVote, VoteType } from '@app/core/models/IVote';
import { environment } from '@env/environment';

@Injectable()
export class VoteApiService {
  static VOTE_API_URL = `${environment.api_url}/votes`;

  constructor(private http: HttpClient) {}

  getVotes(commentId: string) {
    return this.http.get<IVote[]>(`${VoteApiService.VOTE_API_URL}/${commentId}`);
  }

  createVote(commentId: string, voteType: VoteType) {
    const payload: IVote = {commentId, vote: voteType};
    return this.http.put(VoteApiService.VOTE_API_URL, payload);
  }

  updateVote(voteId: string, commentId: string, voteType: VoteType) {
    const payload: IVote = {id: voteId, commentId, vote: voteType};
    return this.http.post(VoteApiService.VOTE_API_URL, payload);
  }
}
