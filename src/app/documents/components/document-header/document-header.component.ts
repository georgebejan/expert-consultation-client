import { Component, Input } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base-component';
import { DocumentMetadata } from '@app/core';

@Component({
  selector: 'ec-document-header',
  templateUrl: './document-header.component.html',
  styleUrls: ['./document-header.component.scss']
})
export class DocumentHeaderComponent extends BaseComponent {
  @Input()
  public document: DocumentMetadata;
}
