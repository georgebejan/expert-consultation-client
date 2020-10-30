import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentConsultationData, IDocumentConsolidate, IDocumentConsultationData, IDocumentMetadata, IUser, Page } from '../models/';
import { environment } from '@env/environment';
import { PageRequest } from '@app/core/models/page-request.model';

@Injectable()
export class DocumentsApiService {

  constructor(private http: HttpClient) {
  }

  private get url() {
    return `${environment.api_url}/documents`;
  }

  public list(pageRequest: PageRequest): Observable<Page<IDocumentMetadata>> {
    const params = new HttpParams()
        .set('page', pageRequest.number.toString())
        .set('size', pageRequest.size.toString());

    return this.http.get<Page<IDocumentMetadata>>(this.url, {params});
  }

  public get(documentId: string): Observable<IDocumentConsolidate> {
    return this.http.get<IDocumentConsolidate>(`${this.url}/${documentId}/consolidated`);
  }

  public post(documentMetadata: IDocumentMetadata): Observable<string> {
    return this.http.post<string>(`${this.url}`, documentMetadata);
  }

  public getAssignedUsers(documentId: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}/${documentId}/users`);
  }

  public saveAssignedUsers(documentId: string, userIds: string[]): Observable<void> {
    return this.http.post<void>(`${this.url}/${documentId}/users`, {userIds});
  }

  public saveDocumentConsultationData(documentId: string, documentConsultationData: DocumentConsultationData): Observable<void> {
    return this.http.post<void>(`${this.url}/${documentId}/consultation`, documentConsultationData);
  }

  public getConsultationData(documentId: string): Observable<IDocumentConsultationData> {
    return this.http.get<IDocumentConsultationData>(`${this.url}/${documentId}/consultation`);
  }
}
