import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ec-add-excel-users',
  templateUrl: './add-excel-users.component.html',
  styleUrls: ['./add-excel-users.component.scss']
})
export class AddExcelUsersComponent implements OnInit, OnDestroy {
  @Output()
  public contentUpdate: EventEmitter<string> = new EventEmitter();
  public excelForm = new FormGroup({
    data: new FormControl('', [Validators.required])
  });

  private TAB_OR_SPACE = '[\t ]';
  private GLOBAL_FLAG = 'g';
  private subscription: Subscription = new Subscription();

  public ngOnInit() {
    this.subscription.add(this.excelForm.get('data').valueChanges.subscribe(data =>
        this.contentUpdate.emit(this.formatExcel(data))
    ));
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private formatExcel(excel: string): string {
    return excel.replace(new RegExp(this.TAB_OR_SPACE, this.GLOBAL_FLAG), ',');
  }
}
