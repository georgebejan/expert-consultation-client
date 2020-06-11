import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DocumentNode } from '@app/core/models';

@Component({
  selector: 'app-document-node-edit-modal',
  templateUrl: './document-node-edit-modal.component.html',
})
export class DocumentNodeEditModalComponent {
  @ViewChild('template', {static: true}) public template: TemplateRef<any>;

  @Output() nodeSave: EventEmitter<DocumentNode> = new EventEmitter<DocumentNode>();

  public node: DocumentNode;
  public modalRef: BsModalRef;

  private config: ModalOptions = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  constructor(private modalService: BsModalService) {
  }

  public open(node: DocumentNode) {
    this.node = node;
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  public close() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  public onNodeChange(node: DocumentNode) {
    this.node = node;
  }

  public onSave() {
    this.nodeSave.emit(this.node);
    this.close();
  }
}
