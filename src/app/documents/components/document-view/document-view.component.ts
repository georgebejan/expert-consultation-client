import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base-component';
import { DocumentConsolidate, DocumentMetadata, DocumentNode } from '@app/core';


@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss']
})
export class DocumentViewComponent extends BaseComponent implements OnInit {
  @Input() document: DocumentConsolidate;
  @Output() toggleCommentAdding: EventEmitter<string> = new EventEmitter<string>();
  documentNode: DocumentNode;
  documentMetadata: DocumentMetadata;

  ngOnInit(): void {
    this.documentMetadata = this.document.documentMetadata;
    this.documentNode = this.document.documentNode;
  }

  clickedAddComment(nodeId) {
    this.toggleCommentAdding.emit(nodeId);
  }

}
