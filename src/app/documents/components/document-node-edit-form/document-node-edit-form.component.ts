import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentNode } from '@app/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ec-document-node-edit-form',
  templateUrl: './document-node-edit-form.component.html',
})
export class DocumentNodeEditFormComponent implements OnInit {
  @Input() node: DocumentNode;
  @Output() nodeChange: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();

  public documentNodeForm = new FormGroup({
    title: new FormControl(''),
    identifier: new FormControl(''),
    content: new FormControl(''),
  });

  public ngOnInit(): void {
    this.documentNodeForm.patchValue(this.node.toFormData());
    this.documentNodeForm.valueChanges.subscribe(formValue => {
      this.nodeChange.emit({
        ...this.node,
        title: formValue.title,
        identifier: formValue.identifier,
        content: formValue.content
      } as DocumentNode);
    });
  }
}
