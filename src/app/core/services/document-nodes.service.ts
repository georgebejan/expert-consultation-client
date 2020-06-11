import { Injectable } from '@angular/core';
import { DocumentNodesApiService } from '../http';
import { DocumentNodeSimple, IDocumentNodeSimple } from '../models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DocumentNodesService {

  constructor(private documentNodesApiService: DocumentNodesApiService) {
  }

  public update(documentNode: DocumentNodeSimple): Observable<DocumentNodeSimple> {
    return this.documentNodesApiService.update(documentNode)
        .pipe(map((iDocumentNode: IDocumentNodeSimple) => new DocumentNodeSimple(iDocumentNode)));
  }
}
