import { Component, Input } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base-component';
import { DocumentNode, DocumentNodeType } from '@app/core';


@Component({
  selector: 'ec-document-menu',
  templateUrl: './document-menu.component.html',
  styleUrls: ['./document-menu.component.scss']
})
export class DocumentMenuComponent extends BaseComponent {
  @Input() documentNodes: DocumentNode[];
  documentNodeTypeEnum: typeof DocumentNodeType = DocumentNodeType;

  scroll(id) {
    const el = document.getElementById(id);
    el.scrollIntoView({behavior: 'smooth'});
  }
}
