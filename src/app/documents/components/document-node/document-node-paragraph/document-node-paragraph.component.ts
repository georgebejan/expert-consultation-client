import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentNode } from '@app/core';

@Component({
  selector: 'ec-document-node-paragraph',
  templateUrl: './document-node-paragraph.component.html',
})
export class DocumentNodeParagraphComponent {
  @Input() paragraph: DocumentNode;
  @Input() isEditMode: boolean;
  @Output() public nodeEditButtonClick: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();

}
