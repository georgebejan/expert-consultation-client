import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { IComment, Page, PageRequest } from '../models';

@Injectable()
export class CommentsApiService {
  constructor(private http: HttpClient) {
  }

  public list(nodeId: string): Observable<Page<IComment>> {
    return this.http.get<Page<IComment>>(this.documentCommentUrl(nodeId));
  }

  public save(nodeId: string, text: string): Observable<IComment> {
    return this.http.post<IComment>(this.documentCommentUrl(nodeId), {text});
  }

  public listReplies(nodeId: string, commentId: string): Observable<Page<IComment>> {
    return this.http.get<Page<IComment>>(this.repliesUrl(nodeId, commentId));
  }

  public saveReply(nodeId: string, commentId: string, text: string): Observable<IComment> {
    return this.http.post<IComment>(this.repliesUrl(nodeId, commentId), {text});
  }

  public getAllPending(pageRequest: PageRequest): Observable<Page<IComment>> {
    const params = new HttpParams()
        .set('page', pageRequest.number.toString())
        .set('size', pageRequest.size.toString());

    return this.http.get<Page<IComment>>(`${this.commentUrl()}/pending`, {params});
  }

  public approvePendingComment(commentId: string): Observable<IComment> {
    return this.http.get<IComment>(`${this.commentUrl()}/${commentId}/approve`);
  }

  public rejectPendingComment(commentId: string): Observable<IComment> {
    return this.http.get<IComment>(`${this.commentUrl()}/${commentId}/reject`);
  }

  private repliesUrl(nodeId: string, commentId: string): string {
    return `${this.documentCommentUrl(nodeId)}/${commentId}/replies`;
  }

  private documentCommentUrl(nodeId: string) {
    return `${environment.api_url}/documentnodes/${nodeId}/comments`;
  }

  private commentUrl() {
    return `${environment.api_url}/comments`;
  }
}
