import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentsApiService } from '../http';
import { DocumentConsolidate, DocumentMetadata, IDocumentConsolidate, IDocumentMetadata, IUser, Page, User } from '../models';
import { map } from 'rxjs/operators';
import { PageRequest } from '@app/core/models/page-request.model';

@Injectable()
export class DocumentsService {

  constructor(private documentsApiService: DocumentsApiService) {
  }

  public list(pageRequest: PageRequest): Observable<Page<DocumentMetadata>> {
    return this.documentsApiService.list(pageRequest)
        .pipe(map(value => this.mapPage(value)));
  }

  public get(documentId: string): Observable<DocumentConsolidate> {
    return this.documentsApiService.get(documentId)
        .pipe(map((iDocumentConsolidate: IDocumentConsolidate) => new DocumentConsolidate(iDocumentConsolidate)));
  }

  public save(documentMetadata: DocumentMetadata): Observable<string> {
    return this.documentsApiService
        .post(documentMetadata.toJson());
  }

  public getAssignedUsers(id: string): Observable<User[]> {
    return this.documentsApiService.getAssignedUsers(id)
        .pipe(map((iUsers: IUser[]) => iUsers.map(iUser => new User(iUser))));
  }

  public saveAssignedUsers(id: string, assignedUsersIds: string[]): Observable<void> {
    return this.documentsApiService.saveAssignedUsers(id, assignedUsersIds);
  }

  private mapPage(userPage: Page<IDocumentMetadata>): Page<DocumentMetadata> {
    const result = new Page<DocumentMetadata>(userPage);
    result.content = userPage.content.map(this.fromResponse);
    return result;
  }

  private fromResponse(documentResponse: IDocumentMetadata): DocumentMetadata {
    return new DocumentMetadata(documentResponse);
  }
}
