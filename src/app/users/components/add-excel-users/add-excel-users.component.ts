import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ec-add-excel-users',
  templateUrl: './add-excel-users.component.html',
  styleUrls: ['./add-excel-users.component.scss']
})
export class AddExcelUsersComponent {

  @Output()
  private save: EventEmitter<string> = new EventEmitter();
  private TAB_OR_SPACE = '[\t ]';
  private GLOBAL_FLAG = 'g';

  textValue: string;

  constructor() {
  }

  public formatExcel(excel: string): string {
    return excel.replace(new RegExp(this.TAB_OR_SPACE, this.GLOBAL_FLAG), ',');
  }

  submitExcel() {
    this.save.emit(this.formatExcel(this.textValue));
  }
}
