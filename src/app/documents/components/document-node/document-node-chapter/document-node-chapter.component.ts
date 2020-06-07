import { Component, Input } from '@angular/core';
import { DocumentNode } from '@app/core';

@Component({
  selector: 'app-document-node-chapter',
  templateUrl: './document-node-chapter.component.html',
})
export class DocumentNodeChapterComponent {
  @Input() chapter: DocumentNode;
}
