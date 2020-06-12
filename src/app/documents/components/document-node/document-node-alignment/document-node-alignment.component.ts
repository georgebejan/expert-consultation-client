import { Component, Input } from '@angular/core';
import { DocumentNode } from '@app/core';

@Component({
  selector: 'ec-document-node-alignment',
  templateUrl: './document-node-alignment.component.html',
})
export class DocumentNodeAlignmentComponent {
  @Input() alignment: DocumentNode;
}
