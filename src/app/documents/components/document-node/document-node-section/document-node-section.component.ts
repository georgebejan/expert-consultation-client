import { Component, Input } from '@angular/core';
import { DocumentNode } from '@app/core';

@Component({
  selector: 'ec-document-node-section',
  templateUrl: './document-node-section.component.html',
})
export class DocumentNodeSectionComponent {
  @Input() section: DocumentNode;
}
