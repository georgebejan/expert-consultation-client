import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentNode } from '@app/core';

@Component({
  selector: 'ec-document-node-section',
  templateUrl: './document-node-section.component.html',
})
export class DocumentNodeSectionComponent {
  @Input() public section: DocumentNode;
  @Input() public isEditMode: boolean;
  @Input() public isInConsultation: boolean;
  @Output() public nodeEditButtonClick: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();
}
