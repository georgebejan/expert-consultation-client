import { Component, Input } from '@angular/core';
import { DocumentMetadata } from '@app/core';

@Component({
  selector: 'app-document-metadata',
  templateUrl: './document-metadata.component.html',
  styleUrls: ['./document-metadata.component.scss']
})
export class DocumentMetadataComponent {
  @Input() metadata: DocumentMetadata;
}
