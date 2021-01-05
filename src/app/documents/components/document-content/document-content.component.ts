import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base-component';
import { DocumentNode, DocumentNodeType } from '@app/core';

@Component({
  selector: 'ec-document-content',
  templateUrl: './document-content.component.html',
  styleUrls: ['./document-content.component.scss']
})
export class DocumentContentComponent extends BaseComponent {
  @Input() public documentNodes: DocumentNode[];
  @Input() public isInConsultation: boolean;
  @Input() public isEditMode: boolean;
  @Output() public nodeEditButtonClick: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();

  public documentNodeTypeEnum: typeof DocumentNodeType = DocumentNodeType;
}
