import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentNode } from '@app/core';

@Component({
  selector: 'ec-document-node-chapter',
  templateUrl: './document-node-chapter.component.html',
})
export class DocumentNodeChapterComponent {
  @Input() chapter: DocumentNode;
  @Input() isEditMode: boolean;
  @Output() public nodeEditButtonClick: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();

}
