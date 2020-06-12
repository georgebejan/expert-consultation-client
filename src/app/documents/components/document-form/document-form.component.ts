import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentMetadata, DocumentType } from '@app/core/models';

@Component({
  selector: 'ec-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements OnInit, OnChanges {
  @Input()
  public document: DocumentMetadata;
  @Input()
  filePath: string;
  @Output()
  public save: EventEmitter<DocumentMetadata> = new EventEmitter();

  public url = '/file';
  public documentForm = new FormGroup({
    documentTitle: new FormControl('', [Validators.required]),
    documentNumber: new FormControl('', [Validators.required]),
    documentInitializer: new FormControl('', [Validators.required]),
    documentType: new FormControl('', [Validators.required]),
    dateOfDevelopment: new FormControl('', [Validators.required]),
    dateOfReceipt: new FormControl('', [Validators.required]),
    filePath: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.documentForm.patchValue(this.document.toFormData());
  }

  ngOnChanges(changes: SimpleChanges): void {
    const filePathChanges = changes['filePath'];
    if (filePathChanges) {
      this.documentForm.patchValue({filePath: filePathChanges.currentValue});
      this.documentForm.controls.filePath.markAsTouched();
    }
  }

  public onSave() {
    const documentMetadata = new DocumentMetadata();
    documentMetadata.id = this.document.id;
    documentMetadata.fromFormData(this.documentForm.value);
    this.save.emit(documentMetadata);
  }

  public documentTypeKeys(): string[] {
    const keys = Object.keys(DocumentType);
    return keys.slice(keys.length / 2);
  }
}
