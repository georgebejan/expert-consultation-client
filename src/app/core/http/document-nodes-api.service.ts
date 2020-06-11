import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { DocumentNodeSimple, IDocumentNodeSimple } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class DocumentNodesApiService {

  constructor(private http: HttpClient) {
  }

  private get url() {
    return `${environment.api_url}/document-nodes`;
  }

  public update(documentNode: DocumentNodeSimple): Observable<IDocumentNodeSimple> {
    return this.http.put<IDocumentNodeSimple>(`${this.url}/${documentNode.id}`, documentNode);
  }
}
