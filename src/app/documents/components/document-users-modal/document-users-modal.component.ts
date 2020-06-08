import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { PageData, PageRequest, User } from '@app/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-document-users-modal',
  templateUrl: 'document-users-modal.component.html',
})
export class DocumentUsersModalComponent implements OnChanges {
  @ViewChild('template', {static: true}) public template: TemplateRef<any>;

  @Input() public availableUsers: User[];
  @Input() public assignedUsers: User[];
  @Input() public pageData: PageData;
  @Output() public assignUsers: EventEmitter<User[]> = new EventEmitter<User[]>();
  @Output() public pageChange: EventEmitter<PageRequest> = new EventEmitter<PageRequest>();
  @Output() public searchTermChange: EventEmitter<string> = new EventEmitter<string>();

  public modalRef: BsModalRef;
  public updatedAssignedUsers = [];
  public searchForm = new FormGroup({term: new FormControl()});

  private subscription = new Subscription();
  private config: ModalOptions = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  constructor(private modalService: BsModalService) {
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['assignedUsers']) {
      this.updatedAssignedUsers = [...this.assignedUsers];
    }
  }

  public open() {
    this.modalRef = this.modalService.show(this.template, this.config);
    this.subscription.add(this.searchForm.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
    ).subscribe(searchUpdate => {
      this.searchTermChange.emit(searchUpdate.term);
    }));
  }

  public close() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.subscription.unsubscribe();
  }

  public onAssignUser(user: User) {
    this.updatedAssignedUsers.push(user);
  }

  public onUnassignUser(user: User) {
    this.updatedAssignedUsers = this.updatedAssignedUsers.filter(assignedUser => assignedUser.id !== user.id);
  }

  public onSave() {
    this.assignUsers.emit(this.updatedAssignedUsers);
    this.close();
  }
}
