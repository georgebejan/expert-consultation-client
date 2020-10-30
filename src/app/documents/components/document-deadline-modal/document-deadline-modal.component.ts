import { AfterViewInit, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DocumentConsultationData } from '@app/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ec-document-deadline-modal',
  templateUrl: 'document-deadline-modal.component.html',
})
export class DocumentDeadlineModalComponent implements AfterViewInit {
  @ViewChild('template', {static: true}) public template: TemplateRef<any>;

  @Input() public startDate: Date;
  @Input() public consultationDeadline: Date;
  @Input() public excludedFromConsultation: boolean;

  @Output() public saveDates: EventEmitter<DocumentConsultationData> = new EventEmitter<DocumentConsultationData>();

  public modalRef: BsModalRef;
  public documentConsultationData;
  public deadlineForm = new FormGroup({
    startDate: new FormControl(),
    consultationDeadline: new FormControl(),
    excludedFromConsultation: new FormControl()
  });

  private subscription = new Subscription();
  private config: ModalOptions = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  constructor(private modalService: BsModalService) {
  }

  public ngAfterViewInit() {
    this.deadlineForm.patchValue({
      startDate: this.startDate,
      consultationDeadline: this.consultationDeadline,
      excludedFromConsultation: this.excludedFromConsultation
    });
  }

  public open() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  public close() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.subscription.unsubscribe();
  }

  public onSave() {
    const data = this.deadlineForm.value;
    this.documentConsultationData = new DocumentConsultationData({
      startDate: data.startDate,
      consultationDeadline: data.consultationDeadline,
      excludedFromConsultation: !!data.excludedFromConsultation
    });
    this.saveDates.emit(this.documentConsultationData);
    this.close();
  }
}
